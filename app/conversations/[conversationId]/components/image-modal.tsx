"use client";

import Modal from "@/app/components/modal";
import Image from "next/image";

interface IImageModalProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
}
const ImageModal: React.FC<IImageModalProps> = ({ src, isOpen, onClose }) => {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image
          alt="Image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          fill
          src={src}
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
