import { Input } from "@/components/ui/input";
import { login } from "./action";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LoginForm() {
	return (
		<>
			<form action={login}>
				<label htmlFor="username">Username</label>
				<Input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<Input type="password" name="password" id="password" />
				<br />
				<Button>Login</Button>
			</form>
			<div className="flex justify-between gap-4">
			<Link className='mt-4' href="/signup">New user? Sign up</Link>
			<Link className='mt-4' href="/">Back</Link>
			</div>
		</>
	);
}

interface ActionResult {
	error: string;
}