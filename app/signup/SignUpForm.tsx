import React from 'react';
import { signup } from '@/app/signup/actions';
import Link from 'next/link';
import { Form } from '@/lib/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SignUpForm() {
  return (
    <>
      <Form action={signup}>
        <label htmlFor="username">Username</label>
        <Input type="text" id="username" name="username" autoComplete="username" />
        <br />
        <label htmlFor="password">Password</label>
        <Input type="password" id="password" name="password" autoComplete="current-password" />
        <br />
        <Button type="submit">Submit</Button>
      </Form>
      <div className="flex justify-between gap-4">
      <Link className='mt-4' href="/login">Already have an account ? Sign in</Link>
			<Link className='mt-4' href="/">Back</Link>
			</div>
    </>
  );
}

export default SignUpForm;
