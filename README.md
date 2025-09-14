# CategorizeOnce - Automatically categorize transactions without giving away your data

Tracking your money is a good habit, but categorizing each transaction is tedious, and people tend not to persist with boring tasks. CategorizeOnce is a client-side web app that remembers how you categorize each payer/payee, creating mapping rules and storing them in your browser's local storage.

See it in action at https://categorizeonce.com.

## Features

- **Private**: process data locally; store mapping rules in the browser's local storage.
- **Flexible**: work with any bank statement in CSV format.
- **Subcategory**: use double colons to add subcategories, e.g., `Expense::Grocery`, `Income::Salary`, `Saving::Investment`.

## Setup instructions

Although it's optional, if you use VS Code, I recommend developing any project inside a dev container. A `.devcontainer` folder is included in the repository and provides an easy start.

Run `npm run dev` to start the Vite dev server. If you use a dev container, use `npm run dev -- --host` instead.

## License

This project is licensed under the Apache License, Version 2.0 - see the [LICENSE](LICENSE) file for details.

Third-party dependencies are subject to their respective licenses - see the [THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt) file for details.
