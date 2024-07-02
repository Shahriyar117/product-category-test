# Product Management Application

This project is a Product Management Application built using React, TypeScript, and Tailwind CSS. It allows users to view, sort, and manage a list of products. The application includes features for listing products, adding new products, and managing categories.

## Project Structure

## Components

### ProductListItem

The `ProductListItem` component displays a list of products in a table format, with sorting functionality for product name and price.

## Layout

### Header

The `Header` component displays the navigation bar with links to the product list and the form to add a new product.

### Footer

The `Footer` component displays the footer of the application.

### Layout

The `ApplicationLayout` component is a wrapper for the entire application with Header and Footer.

## Configuration

### Config

The `index.ts` file contains the application configuration, including the API URL.

## Layout

### ApplicationLayout

The `ApplicationLayout` component defines the main layout of the application, including the header, footer, and the main content area.

## Routes

### Index

The `_index.tsx` file defines the root route of the application, which displays the default content.

### Products

The `products._index.tsx` file defines the route for displaying the product list with sorting and pagination functionality.

### Products New

The `products.new.tsx` file defines the route for adding a new product to the list.

## Types

### Product Type

The `product.type.ts` file defines the `Product` interface used throughout the application.

### Category Type

The `category.type.ts` file defines the `Category` interface used throughout the application.

## Utilities

### API

The `api.ts` file contains functions for fetching and saving data to the API.

## Getting Started

1. Clone the repository:

```sh
git clone https://github.com/Shahriyar117/product-category-test.git
cd product-category-test/frontend
```

2. Install the dependencies:

```sh
npm install
```

3. Start the development server:

```sh
npm run dev
```
