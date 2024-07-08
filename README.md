## Getting Started

First, install the application dependencies:

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Updating and Synchronizing with Prisma

To update and synchronize the database:

```bash
npx prisma generate; npx prisma db push; 

OR

npm run prisma-push
```

## Using Prisma Studio

Usage

To start Prisma Studio, use the following command:

```bash
npx prisma studio

OR

npm run studio
```
This command will open Prisma Studio in your default web browser, providing a visual interface to interact with your database.
Features

    Browse Data: View and search through all the records in your database.
    Edit Records: Add, edit, and delete records directly from the interface.
    Relational Data: Navigate and manage relations between different tables easily.

Troubleshooting

    No Browser Opening: If Prisma Studio does not open in your browser, ensure that you do not have any connectivity issues and that your project is set up correctly.
    Database Connection Issues: Ensure that your database is running and accessible with the correct credentials defined in your .env file.

Documentation

For more detailed information, visit the [Prisma Studio Documentation](https://www.prisma.io/docs/orm/tools/prisma-studio).

## Deploy on Vercel

The easiest way to deploy the app is to use the [Vercel Platform](https://vercel.com) 

1. Log in using your GitHub account.

2. In the "Overview" tab, click the "Add New" button, then scroll down to "Project".

3. Import the Git Repository from the GitHub account

4. Enter the project name in the "Configure Project" window, selecting "Next.js" as Framework Preset

5. Copy and paste the .env file in this repository into the Environment Variables tab (copy paste the entire .env file instead of one line at a time)

6. Press Deploy

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## App Folder Tree
```EduCare
├── .env
├── .env.sample
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── app
│   ├── (auth)
│   │   ├── error
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   ├── choose
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── new-password
│   │   │   └── page.tsx
│   │   ├── new-verification
│   │   │   └── page.tsx
│   │   ├── register
│   │   │   └── page.tsx
│   │   └── reset
│   │       └── page.tsx
│   ├── (protected)
│   │   ├── _components
│   │   │   └── Nav.tsx
│   │   └── layout.tsx
│   ├── (root)
│   │   └── (dashboard)
│   │       ├── admin
│   │       │   ├── dashboard
│   │       │   │   └── page.tsx
│   │       │   ├── layout.tsx
│   │       │   ├── page_backup.tsx.txt
│   │       │   └── settings
│   │       │       └── page.tsx
│   │       ├── doctor
│   │       │   ├── [studentId]
│   │       │   │   └── page.tsx
│   │       │   ├── dashboard
│   │       │   │   └── page.tsx
│   │       │   ├── layout.tsx
│   │       │   └── page backup.txt
│   │       └── student
│   │           ├── dashboard
│   │           │   └── page.tsx
│   │           ├── layout.tsx
│   │           ├── profile
│   │           │   └── page.tsx
│   │           ├── services
│   │           │   ├── columns.tsx
│   │           │   ├── data-table.tsx
│   │           │   └── page.tsx
│   │           ├── share
│   │           │   └── page.tsx
│   │           └── user
│   │               └── page.tsx
│   ├── _app.tsx
│   ├── api
│   │   ├── [...slug].ts
│   │   ├── academicFunctionForm
│   │   │   └── route.ts
│   │   ├── accessibilityForm
│   │   │   └── route.ts
│   │   ├── admin
│   │   │   ├── formData.ts
│   │   │   ├── route.ts
│   │   │   └── users.ts
│   │   ├── assessmentHistory
│   │   │   └── route.ts
│   │   ├── auth
│   │   │   └── [...nextauth]
│   │   │       └── route.ts
│   │   ├── bidirectionalConsentForm
│   │   │   └── route.ts
│   │   ├── disabilityConfirmation
│   │   │   └── route.ts
│   │   ├── healthPractitionerForm
│   │   │   └── route.ts
│   │   ├── introConsentSection
│   │   │   └── route.ts
│   │   ├── osapDisabilityConfirmation
│   │   │   └── route.ts
│   │   ├── personalInfoSection
│   │   │   └── route.ts
│   │   ├── practitionerForm
│   │   │   └── route.ts
│   │   ├── recommendationForm
│   │   │   └── route.ts
│   │   ├── send
│   │   │   └── route.ts
│   │   ├── studentDisabilitySection
│   │   │   └── route.ts
│   │   ├── studentOSAPForm
│   │   │   └── route.ts
│   │   └── upload.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── auth.config.ts
├── auth.ts
├── components
│   ├── AdminFormData.tsx
│   ├── AdminUserCard.tsx
│   ├── FileUpload.tsx
│   ├── Footer.tsx
│   ├── Loader.tsx
│   ├── MobileNav.tsx
│   ├── Navbar
│   │   ├── auth-nav.tsx
│   │   └── navbar.tsx
│   ├── Navbar.tsx
│   ├── Sidebar
│   │   ├── admin-sidebar.tsx
│   │   ├── doctor-sidebar.tsx
│   │   └── sidebar.tsx
│   ├── Sidebar.tsx
│   ├── WagmiReadContractComponent.tsx
│   ├── WagmiSafeMint.tsx
│   ├── WagmiTransactionComponents.tsx
│   ├── WagmiUseAccount.tsx
│   ├── WagmiUseSignMessage.tsx
│   ├── WagmiVerifyMessage.tsx
│   ├── WagmiWriteContractComponent.tsx
│   ├── auth
│   │   ├── back-button.tsx
│   │   ├── card-wrapper.tsx
│   │   ├── error-card.tsx
│   │   ├── header.tsx
│   │   ├── login-button.tsx
│   │   ├── login-form.tsx
│   │   ├── new-password-form.tsx
│   │   ├── new-verification-form.tsx
│   │   ├── register-button.tsx
│   │   ├── register-form.tsx
│   │   ├── reset-form.tsx
│   │   ├── role-gate.tsx
│   │   └── social.tsx
│   ├── email-template.tsx
│   ├── form-error.tsx
│   ├── form-success.tsx
│   ├── forms
│   │   ├── AcademicFunctionForm.tsx
│   │   ├── AccessibilityForm.tsx
│   │   ├── AssessmentHistory.tsx
│   │   ├── BidirectionalConsentForm.tsx
│   │   ├── DisabilityConfirmation.tsx
│   │   ├── HealthPractitionerForm.tsx
│   │   ├── IntakeForm.tsx
│   │   ├── IntroConsentSection.tsx
│   │   ├── OSAPDisabilityConfirmation.tsx
│   │   ├── PersonalInfoSection.tsx
│   │   ├── PractitionerForm.tsx
│   │   ├── RecommendationForm.tsx
│   │   ├── StudentDisabilitySection.tsx
│   │   └── StudentOSAP.tsx
│   ├── interfaces
│   │   └── FormDataInterfaces.ts
│   ├── ui
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── radio-group.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sonner.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── use-toast.ts
│   └── user
│       ├── profile-nav.tsx
│       ├── user-card.tsx
│       ├── user-info.tsx
│       └── user-tabs.tsx
├── components.json
├── constants
│   ├── educareNFTABI.json
│   ├── educareNFTABI.ts
│   └── index.ts
├── context
│   ├── README.md
│   ├── context.js
│   └── web3modal.tsx
├── contracts
│   └── ERC721.sol
├── data
│   ├── account.ts
│   ├── password-reset-token.ts
│   ├── user.ts
│   └── verification-token.ts
├── hardhat.config.js
├── hooks
│   ├── useCurrentRole.ts
│   ├── useCurrentUser.ts
│   └── useGetContractInfo.ts
├── ignition
│   └── modules
│       └── ERC721.js
├── lib
│   ├── actions
│   │   ├── admin.ts
│   │   ├── checkRole.ts
│   │   ├── login.ts
│   │   ├── new-password.ts
│   │   ├── new-verification.ts
│   │   ├── redirect.ts
│   │   ├── register.ts
│   │   ├── reset.ts
│   │   └── settings.ts
│   ├── auth.ts
│   ├── config.ts
│   ├── contractDetails.mjs
│   ├── db.ts
│   ├── mail.ts
│   ├── services
│   │   ├── WagmiReadContract.ts
│   │   └── WagmiValidateMessage.ts
│   ├── tokens.ts
│   ├── utils.ts
│   └── wagmiContextProvider.tsx
├── middleware.ts
├── next-auth.d.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── prisma
│   ├── schema copy.prisma.txt
│   └── schema.prisma
├── public
│   ├── auth-bg.png
│   ├── educare-img.jpeg
│   ├── educare-logo.jpeg
│   ├── favicon.ico
│   ├── icons
│   │   ├── hamburger.svg
│   │   ├── home.svg
│   │   ├── loading-circle.svg
│   │   ├── next.svg
│   │   ├── previous.svg
│   │   ├── schedule.svg
│   │   └── upcoming.svg
│   ├── next.svg
│   ├── profile-background.png
│   ├── profile-pic.avif
│   ├── profile-pic.jpg
│   ├── uploads
│   └── vercel.svg
├── routes.ts
├── schemas
│   └── index.ts
├── tailwind.config.ts
├── test
│   ├── Lock.js
│   ├── config.ts
│   ├── curlTest.mjs
│   └── page.tsx
└── tsconfig.json
```