'use client';
//
// import { useState } from 'react';
// import { UserTypeSelection } from '@/components/auth/UserTypeSelection';
// import Header from '@/components/ui/Header';
//
// export default function SignUp() {
//   const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(true);
//
//   // We don't need to redirect automatically
//   // The UserTypeSelection component will handle navigation
//   // when a user type is selected
//
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Header />
//       <div className="flex items-center justify-center min-h-screen p-4 pt-20">
//         {/*<UserTypeSelection*/}
//         {/*  isOpen={isSelectionModalOpen}*/}
//         {/*  onClose={() => setIsSelectionModalOpen(false)}*/}
//         {/*  mode="signup"*/}
//         {/*/>*/}
//
//       </div>
//     </div>
//   );
// }

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/auth/signup/student');
    }, [router]);

    return null;
}
