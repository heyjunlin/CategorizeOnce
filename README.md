# CategorizeOnce - Automatically categorize transactions without giving away your data

Tracking your money is a good habit, but categorizing each transaction is tedious, and people tend not to persist with boring tasks. CategorizeOnce is a client-side web app that remembers how you categorize each payer/payee, creating mapping rules and storing them in your browser's local storage.

See it in action at https://heyjunlin.github.io/CategorizeOnce/.

## categorizeonce.com is shutting down on 1 September 2027

I'm letting the domain expire. If you use the hosted site, download your mapping rules from the Mapping Rules page and clear them from your browser before that date — the domain will change hands, and rules left in your browser's local storage could be read by whoever owns it next.

The project isn't going away — it now lives at https://heyjunlin.github.io/CategorizeOnce/. Import your downloaded rules there, or follow the setup instructions below to run it on your own machine. Note that mapping rules are stored per site, so they don't carry over from categorizeonce.com automatically; you have to download them from the old site and import them on the new one.

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
