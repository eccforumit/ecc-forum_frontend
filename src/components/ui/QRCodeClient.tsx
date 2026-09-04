"use client";
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

interface QRCodeClientProps {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  className?: string;
}

export const QRCodeClient: React.FC<QRCodeClientProps> = ({ 
  value, 
  size = 160, 
  level = "H",
  className = ""
}) => {
  return <QRCodeSVG value={value} size={size} level={level} className={className} />;
};
