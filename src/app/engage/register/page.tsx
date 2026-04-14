import { redirect } from 'next/navigation';

// Engage Registration — same form as free membership registration (Form C), no payment required
export default function EngageRegisterPage() {
    redirect('/membership/register/form-c');
}
