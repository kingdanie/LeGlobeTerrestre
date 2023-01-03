# Holivoo Blog 
The code base for the holivoo blog site was built on the [Next.js](https://nextjs.org/) and  Wordpress (serving as the content management system). In essence this is a JAMSTACK arrangement. 

# Pre-requisites
For seemless development and deployment of the project, node 14 is required.  Using higher versions of node will likely result in the code failing to compile as the dependence postcss strangely would not run on these versions. 

# Things To Note
the link tag of next 10 requires the a child a tag for the element to be linked. 


# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


# APIs
Graphql provides the interfacing layer for accessing the WordPress data. The Graphql API queries can be found in the dir /lib.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
