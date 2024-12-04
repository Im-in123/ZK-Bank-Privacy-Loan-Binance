

vercel env add PORT 5000
vercel env add JWT_SECRET supersecretkey


vercel env add <name> <value>  available in all environments
vercel env rm <name>
vercel env ls

locally use .env for vercel

vercel env add <name> <value> --env <environment> #development, preview, production




To add environment variables to your Vercel project using the Vercel CLI, follow these steps:

1. Using Vercel CLI to Add Environment Variables:
You can set environment variables directly in your Vercel project using the Vercel CLI. This can be done in two ways: globally or for specific environments (e.g., development, preview, or production).

Set Environment Variables Globally:
To add environment variables for your project globally (i.e., available in all environments), run the following command:

bash
Copy code
vercel env add <name> <value>
<name>: The name of the environment variable (e.g., DATABASE_URL, SECRET_KEY, etc.).
<value>: The value of the environment variable.
For example:

bash
Copy code
vercel env add DATABASE_URL mysql://user:password@host:port/database
Set Environment Variables for Specific Environments:
Vercel allows you to set different environment variables for different environments (e.g., development, preview, production).

To add an environment variable for a specific environment, use the --env flag:

bash
Copy code
vercel env add <name> <value> --env <environment>
<environment> can be one of the following: development, preview, or production.
For example:

bash
Copy code
vercel env add DATABASE_URL mysql://user:password@host:port/database --env production