import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription - Forum ECC',
  description: 'Créez votre compte Forum ECC',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
