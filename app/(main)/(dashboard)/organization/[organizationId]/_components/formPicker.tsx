"use client";

import FormError from "@/components/form/formError";
import { useToast } from "@/components/ui/use-toast";
import { ImageType, defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { CheckCheck, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<ImageType>>(defaultImages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (res && res.response) {
          const newImages = res.response as ImageType[];
          setImages(newImages);
        } else {
          toast({
            title: "Failed to fetch images from unsplash!",
          });
        }
      } catch (e: any) {
        setIsLoading(true);
        setImages(defaultImages);
        toast({
          title: "Failed to fetch images from unsplash!",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-3">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative mt-3">
      <div className="grid grid-cols-3 mb-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer group relative aspect-video hover:opacity-75 transition-all bg-muted",
              pending
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              id={id}
              name={id}
              type="radio"
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              src={image.urls.thumb}
              alt="cover image"
              className="object-cover rounded-md"
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/50 flex items-center justify-center">
                <CheckCheck className="w-4 h-4 text-white" />
              </div>
            )}
            <Link
              target="_blank"
              href={image.links.html}
              className="absolute bottom-0 opacity-0 group-hover:opacity-100 text-white w-full text-[10px] bg-black/50"
            >
              {image.user.name}
            </Link>
            <FormError id={id} errors={errors} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPicker;
