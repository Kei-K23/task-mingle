"use client";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        setIsLoading(true);
        const res = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (res && res.response) {
          const newImages = res.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log("Failed to fetch images from unsplash!");
        }
      } catch (e: any) {
        setIsLoading(true);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImage();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative mt-3">
      <div className="grid grid-cols-3 mb-3 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video hover:opacity-75 transition-all bg-muted",
              pending
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImage(image.id);
            }}
          >
            <Image
              fill
              src={image.urls.thumb}
              alt="cover image"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormPicker;
