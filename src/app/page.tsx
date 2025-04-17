export default function HomePage() {
  return (
    <div className="container, mx-auto px-4 my-6">
      <h1 className="text-2xl mb-6">Permission Systems</h1>
      <div>
        <p className="mb-6">
          In this small authentication and authorisation prototype, I will show
          a few different type of permission systems for react based
          application. The implementation of Clerk Authentication, UI
          Components, APIs, Permissions, User and Session Management. I will
          highlight the incorrect and correct ways to implement permissions in
          this application
        </p>
      </div>

      <h2 className="text-xl mb-6">Introduction</h2>

      <div>
        <p className="mb-6">
          Authentication and Authorisation, are two essential terms used in the
          context of access control, and more specifically,
          Identity-Access-Management (IAM). Understanding the difference between
          the two is absolutely crucial. The IAM domain can be a bit confusing -
          and the fact that authentication and authorization sound similar
          doesn&apos;t help either. Combined, Authentication and Authorization
          determine the security of your application - and your application is
          not secure unless you have configured both correctly.
        </p>
      </div>

      <h2 className="text-xl mb-6">What is Authentication?</h2>

      <div>
        <p className="mb-6">
          Authentication is the first step in the process of access control. It
          involves verifying the identity of a user, device, or other entity in
          a computer system, often as a prerequisite to granting access to
          resources in that system. Common authentication methods include
          passwords, Multi-factor authentication (MFA), biometric data, and OTPs
          (One-Time Passwords).
        </p>

        <p className="mb-6">
          For instance, consider token-based authentication, a popular method in
          modern web applications. Token-based authentication works by issuing a
          token upon the successful verification of credentials. This token,
          usually a cryptographically signed piece of data, is then used to
          access the application, replacing the need for repeated username and
          password inputs.
        </p>

        <p className="mb-6">Leading authentication services include:</p>

        <ul className="list-disc list-inside ml-12">
          <li>Auth0</li>
          <li>AWS</li>
          <li>Cognito</li>
          <li>Magic.link</li>
        </ul>

        <p className="mb-6 mt-6">and many more.</p>

        {/* <p className="mb-6"></p> */}
      </div>

      <h2 className="text-xl mb-6">What is Authorisation?</h2>

      <div>
        <p className="mb-6">
          After authentication, the system must determine what an authenticated
          user can do. This is where authorization comes in. Authorization is
          the process of establishing permissions for a user determining the
          operations that they can perform.
        </p>

        <p className="mb-6">
          Permission models for authorization vary widely. Role-Based Access
          Control (RBAC) is a common model where access rights are grouped by
          roles, and users are assigned roles based on their responsibilities.
          This model simplifies managing user permissions, especially in large
          organizations where many users have overlapping access needs.
        </p>

        <p className="mb-6">Other common policy models include</p>

        <ul className="list-disc list-inside ml-12">
          <li>Attribute Based Access Control (ABAC)</li>
          <li>policy-based access control (PBAC)</li>
          <li>Relationship-Based Access Control (ReBAC)</li>
        </ul>

        {/* <p className="mb-6"></p> */}
      </div>

      <h2 className="text-xl mt-6 mb-6">What is Clerk?</h2>

      <div>
        <p className="mb-6">
          Clerk provides a comprehensive solution for user authentication and
          management, offering both ready-to-use UI components and flexible APIs
          for web applications. It handles the full session lifecycle, including
          secure user login, sign-up, and user profile management. In essence,
          Clerk is a powerful and user-friendly platform that simplifies
          authentication and user management for web developers, enabling them
          to build secure and scalable applications
        </p>

        {/* <p className="mb-6"></p> */}
      </div>

      <h2 className="text-xl mt-6 mb-6">Why use Clerk?</h2>

      <div>
        <p className="mb-6">
          <span className="font-semibold">Simplified Development: </span>
          <br />
          <br />
          Clerk simplifies the development process by handling the complexities
          of authentication and user management, allowing developers to focus on
          building their core product features.
        </p>

        <p className="mb-6">
          <span className="font-semibold">Enhanced Security: </span>
          <br />
          <br />
          Clerk provides robust security features, including multi-factor
          authentication and secure session management, ensuring a secure
          environment for users and developers.
        </p>

        <p className="mb-6">
          <span className="font-semibold">Scalability and Flexibility: </span>
          <br />
          <br />
          Clerk&apos;s flexible APIs and comprehensive features make it a
          scalable and versatile solution for applications of various sizes and
          complexities
        </p>

        <p className="mb-6">
          <span className="font-semibold"></span>
        </p>

        <p className="mb-6">
          <span className="font-semibold"></span>
        </p>

        <p className="mb-6"></p>

        {/* <p className="mb-6">Other common policy models include</p>

        <ul className="list-disc list-inside ml-12">
          <li>Attribute Based Access Control (ABAC)</li>
          <li>policy-based access control (PBAC)</li>
          <li>Relationship-Based Access Control (ReBAC)</li>
        </ul> */}

        {/* <p className="mb-6"></p> */}
      </div>

      {/* <div>
        <ul className="list-disc list-inside ml-12">
          <li>
            Authentication: Verifies if the user is who they say they are. It
            requires the user to prove their identity with something they have,
            such as a username and password.
          </li>
          <li>
            Session Management: Tracks the user&apos;s auth state across
            requests.
          </li>
          <li>
            Authorization: Decides what routes and data the user can access.
          </li>
        </ul>
      </div> */}
    </div>
  );
}
