import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

import { hasPermission } from "@/lib/auth/auth-rbac";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";

import ClerkProvider from "../../assets/clerk-provider-v1.png";
import ClerkMiddleware from "../../assets/clerk-middleware-v1.png";
import EnvironmentVariables from "../../assets/clerk-env-variables-v1.png";
import SignInRoute from "../../assets/sign-in-route.png";
import SignUpRoute from "../../assets/sign-up-route.png";
import UpdatedEnvironmentVariables from "../../assets/clerk-env-variables-v2.png";
import UpdatedMiddleware from "../../assets/clerk-middleware-v2.png";
import SecondarySecurityChecks from "../../assets/security-check-v1.png";
import ClerkRolesPermissions from "../../assets/clerk-role-permissions.png";
import ClerkUserMetadata from "../../assets/clerk-metadata-v1.png";
import ClerkWebhooks from "../../assets/clerk-webhook-v1.png";
import SignUp from "../../assets/sign-up-v1.png";
import SignIn from "../../assets/sign-in-v1.png";
import SignInRedirect from "../../assets/sign-in-v2.png";
import SignInNotAuthor from "../../assets/sign-in-v3.png";
import AdminUser from "../../assets/sign-in-v4.png";
import Link from "next/link";

//const authorId = "1";
const authorId = "user_2vjHj20yihQ6QZKka7LkPaILTnr";

export default async function ClerkAuthentication() {
  // get user id
  const { sessionClaims, userId } = await auth();

  // if no user or role return redirect to sign in page
  if (userId == null || sessionClaims.roles == null) {
    return redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string);
  }

  const userDetails = await currentUser();
  //console.log("User: ", userDetails);

  const user = {
    id: userId,
    roles: sessionClaims.roles,
    username: userDetails?.username,
  };

  return (
    <div className="flex flex-col-reverse lg:grid md:grid-cols-[6fr_2fr]">
      <div className="bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
        <h1 className="text-2xl mb-6">Clerk Integration</h1>
        <h2 className="text-1xl mb-2">Welcome back {user?.username}</h2>
        <div className="text-1xl mb-2">Role: {sessionClaims?.roles}</div>
        <div className="text-1xl mb-6">UserId: {user.id}</div>
        <Card>
          <CardHeader>Comment</CardHeader>
          <CardContent>Some random content</CardContent>
          {(hasPermission(user, "delete:comments") ||
            (hasPermission(user, "delete:ownComments") &&
              user.id === authorId)) && (
            <CardFooter>
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          )}
        </Card>

        <h2 className="text-xl mt-6 mb-6">Introduction</h2>

        <div>
          <p className="mb-6">
            To move this application from concept to prototype, I wanted to
            integrate a real User management and identity service. First adding
            authentication to the application with clerk, using real user
            objects, rather than using hard coded permission objects. Then
            implementing RBAC with users, roles and permissions managed in clerk
            backend, creating a secure, scalable, real world prototype. As you
            can see above, I am pulling out a user, there role and permissions
            all from clerk.
          </p>
        </div>

        <h2 className="text-xl mt-6 mb-6">Integration Process</h2>

        <div>
          <p className="mb-6">
            Your best friend here is the documentation for clerk and next js, it
            is very straight forward and easy to follow. Simply start by
            installing the clerk package ‘@clerk/nextjs’, importing the clerk
            provider and wrapping your entire application in this clerk
            provider. This ensures that the authentication services and alike,
            are available across your application. Since I am using next js,
            this is done in the layout file shown below.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={ClerkProvider}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Middleware</h2>

        <div>
          <p className="mb-6">
            Next you need to add into your application is your middleware file
            this is directly copied from the clerk documentation. Next.js refers
            to Middleware as functions that run automatically for every incoming
            request, allowing you to inspect or modify the request data before
            it reaches your application&apos;s routing system.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={ClerkMiddleware}
            alt="Clerk Middleware"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Environment Variables</h2>

        <div>
          <p className="mb-6">
            Clerk will give you a number of environment variables. You will need
            to create a new .env file to store them in
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={EnvironmentVariables}
            alt="Clerk Middleware"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Webhooks</h2>

        <div>
          <p className="mb-6">
            Then you&apos;re also going to want to set up a webhook inside of
            the api folder. A lot of this code is directly from the
            documentation. First of all we get all the information from our web
            hook ensuring it&apos;s coming from Clerk but essentially all
            we&apos;re doing is we&apos;re taking in a web hook, that every
            single time that we have the user created event being fired, shown
            below.
          </p>

          <div className="flex justify-center items-center mb-6">
            <Image
              src={ClerkWebhooks}
              alt="clerk Webhooks"
              width={1000}
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>

          <p className="mb-6">
            We&apos;re just checking whenever a user is created we&apos;re
            making sure to update their role to have a role of user and setting
            that information on the user’s public metadata, which is nice
            because now we can use this role anywhere, whether we&apos;re on the
            client on the server it really doesn&apos;t matter we&apos;ll have
            access to the role directly on the user object now.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={EnvironmentVariables}
            alt="Clerk Middleware"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <div>
          <p className="mb-6">
            Again thinking of creating a full prototype, I decided to add custom
            sign in and sign up pages to the application.
          </p>
        </div>

        <h2 className="text-xl mt-6 mb-6">Custom SignIn Route</h2>

        <div>
          <p className="mb-6">Taken directly from the docs</p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={SignInRoute}
            alt="Sign in route"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Custom SignUp Route</h2>

        <div>
          <p className="mb-6">Taken directly from the docs</p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={SignUpRoute}
            alt="Sign in route"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Updated Environment Variables</h2>

        <div>
          <p className="mb-6">
            Updated environment variables to include the new routes for sign in
            and sign up as well as their fallback redirect URLs
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={UpdatedEnvironmentVariables}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Updated Middleware</h2>

        <div>
          <p className="mb-6">
            Updated middleware to deal with protected and public routes
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={UpdatedMiddleware}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Secondary Security Checks</h2>

        <div>
          <p className="mb-6">
            Do necessary secondary security checks on the page. If the user is
            not logged in or they don’t have a valid session, they will be
            redirected to the sign in page. Keeping in mind the latest security
            breach in next js.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={SecondarySecurityChecks}
            alt="basic roles"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Clerk Roles and Permissions</h2>

        <div>
          <p className="mb-6">
            Create the admin, moderator and user roles in clerk and assign them
            the necessary permissions.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={ClerkRolesPermissions}
            alt="clerk roles and permissions"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Basic Integration Complete</h2>

        <div>
          <p className="mb-6">
            That’s it we are ready to take this out for a test run. The clerk
            documentation is amazing and covers everything you need to do and as
            you can see we install clerk get the environment variables get our
            middleware wrap everything in the provider, add webhook set up
            custom sign in and sign up routes and added all the roles and
            permissions and that&apos;s literally it we&apos;re entirely done,
            straightforward.
          </p>
        </div>

        <h2 className="text-xl mt-6 mb-6">Sign Up Test</h2>

        <div>
          <p className="mb-6">
            Here I have tested the process to sign up a new user using clerk
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={SignUp}
            alt="clerk roles and permissions"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">User Metadata</h2>

        <div>
          <p className="mb-6">
            As you can see, we have a user with the user’s role stored in their
            metadata, this means that our webhook has worked fine.
          </p>

          <div className="flex justify-center items-center mb-6">
            <Image
              src={ClerkUserMetadata}
              alt="clerk roles and permissions"
              width={1000}
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div>
          <p className="mb-6">
            A quick note that you can setup port forwarding to test you webhooks
            locally directly in vscode. If you do, when forwarding the port,
            make sure to set it to public and update the webhook confiuration in
            clerk to listen for the new url. I always stop forwaring a port once
            testing is finished. This will be updated at a later stage, once we
            go live.
          </p>
        </div>

        <h2 className="text-xl mt-6 mb-6">Sign In Test</h2>

        <div>
          <p className="mb-6">
            Here we simply testing our sign in route and our authorisation
            checksthat we processed in middleware.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={SignIn}
            alt="clerk roles and permissions"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Authenticated User</h2>

        <div>
          <p className="mb-6">
            If everything is fine, we are redirected to this clerk
            authentication page, where again, we do a secondary security check
            for the user and the session from clerk, using clerk auth and
            session claims. As you can see below everything worked fine. The
            logged in user, has the user&apos;s role, clerk userId, and because
            they are the creator of the comment can see the delete button.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={SignInRedirect}
            alt="clerk roles and permissions"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Different Authenticated User</h2>

        <div>
          <p className="mb-6">
            Here we have the same clerk user logged in, but is not the author of
            this comment. The user can now only read the comment, but can no
            longer delete it, as this user does noy vown the comment
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={SignInNotAuthor}
            alt="clerk roles and permissions"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Admin User</h2>

        <div>
          <p className="mb-6">
            I have signed up a new user who is managed in clerk, and has
            assigned to them the admin and user roles, As you can see a admin
            user has the ability to delete comments. Earlier when discussing
            permission mindset, one of the things I meant, was to always try and
            design your permission systems with the ability for users to have
            multiple roles no matter if it&apos;s a current requirement or not.
            I always try and build these systems with change at the forefront of
            my mind as well as scalability and maintainability.
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={AdminUser}
            alt="Admin user roles and permissions"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Moderator User</h2>

        <div>
          <p className="mb-6">
            I have signed up a new user who is managed in clerk, and has
            assigned to them the moderator and user roles. As you can see a
            moerator has the ability to delete comments
          </p>
        </div>

        <div className="flex justify-center items-center mb-6">
          <Image
            src={AdminUser}
            alt="Admin user roles and permissions"
            width={1000}
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>

        <h2 className="text-xl mt-6 mb-6">Conclusion</h2>

        <div>
          <p className="mb-6">
            As s system, service, no matter the business or domain, your ethos
            should be, you are in this for the long run, to as successful as
            possible to scale and be all you can be. So starting out with the
            correct mindset, doing your due diligence and research with regards
            to your implementation or integration will save you a lot of pain in
            the long run.
          </p>
          <p className="mb-6">
            Role-Based Access Control (RBAC) is a common model where access
            rights are grouped by roles, and users are assigned roles based on
            their responsibilities. This model simplifies managing user
            permissions, especially in large organizations where many users have
            overlapping access needs. Having your permissions all handled in one
            location i.e. an authentication file, database or in the backend of
            clerk makes things easier with regards to changing requirements,
            scalability and maintainability. Lets have a look at the final
            Permission system I will cover today and that is{" "}
            <Link href="/abac" className="underline hover:no-underline">
              Attribute Base Access Control
            </Link>
          </p>
        </div>
      </div>

      <aside className="bg-white/50 rounded-xl py-7 px-8 m-6  h-fit w-fit hidden md:block">
        <h1 className="text-2xl mb-6">Table of contents</h1>
        <p className="mt-6 mb-6 text-transparent">
          As you can see the system very quickly spirals out of control it works
          great for relatively simple systems but as soon as you get more
          complex it becomes very limited. Leading us into the final permission
          system we are going to build and discuss, Attribute Based Role Access
        </p>
      </aside>
    </div>
  );
}
