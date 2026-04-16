"use client";

import { useState } from "react";
import Image from "next/image";

type Crop = {
    x: number;
    y: number;
    width: number;
    height: number;
    sourceWidth: number;
    sourceHeight: number;
};

function buildCenteredCrop(
    sourceWidth: number,
    sourceHeight: number,
    targetWidth: number,
    targetHeight: number,
): Crop {
    const targetRatio = targetWidth / targetHeight;
    const sourceRatio = sourceWidth / sourceHeight;

    if (sourceRatio > targetRatio) {
        const cropWidth = sourceHeight * targetRatio;
        return {
            x: 0,
            y: 0,
            width: cropWidth,
            height: sourceHeight,
            sourceWidth,
            sourceHeight,
        };
    }

    const cropHeight = sourceWidth / targetRatio;
    return {
        x: 0,
        y: 0,
        width: sourceWidth,
        height: cropHeight,
        sourceWidth,
        sourceHeight,
    };
}

type CardImageWithSkeletonProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    type?: string;
};


export default function CardImageWithSkeleton({
    src,
    alt,
    width = 150,
    height = 120,
    className,
}: CardImageWithSkeletonProps) {
    const [loadedImage, setLoadedImage] = useState<{
        src: string;
        sourceWidth: number;
        sourceHeight: number;
    } | null>(null);
    const isLoaded = loadedImage?.src === src;
    const crop = isLoaded
        ? buildCenteredCrop(loadedImage.sourceWidth, loadedImage.sourceHeight, width, height)
        : null;
    const scaleX = width / (crop?.width || width);
    const scaleY = height / (crop?.height || height);

    const cropStyle = {
        width: crop ? crop.sourceWidth * scaleX : width,
        height: crop ? crop.sourceHeight * scaleY : height,
        maxWidth: "none",
        transform: crop ? `translate(${-crop.x * scaleX}px, ${-crop.y * scaleY}px)` : undefined,
    };

    return (
        <div
            className="relative overflow-hidden rounded"
            style={{ width, height, maxWidth: "100%" }}
            aria-busy={!isLoaded}
        >
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-stone-300" aria-hidden="true" />
            )}
            <Image
                src={src}
                alt={alt}
                width={crop?.sourceWidth || width}
                height={crop?.sourceHeight || height}
                loading="lazy"
                onLoadingComplete={(img) =>
                    setLoadedImage({
                        src,
                        sourceWidth: img.naturalWidth,
                        sourceHeight: img.naturalHeight,
                    })
                }
                style={cropStyle}
                className={`${className ?? ""} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`.trim()}
            />
        </div>
    );
}
