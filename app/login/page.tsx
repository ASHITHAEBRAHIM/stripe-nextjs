import LoginForm from "./LoginForm";


export default async function Page() {
  return (
    <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Login 
      </h2>
	  <LoginForm/>
    </div>
  );
}
