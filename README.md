# autorunner

Autorunner is a command line utility that automatically re-runs a command when a file is saved.

## Installation

First [install node](https://nodejs.org/download/), then:

    npm install -g autorunner

## Usage

At the top of any file, add `autorun: COMMAND`, then invoke `autorunner` with the filename as an argument. Each time the file is saved, `COMMAND` will be run.

For example, say we have a file `app.coffee`, and every time the file is saved it should be compiled with `coffee -c app.coffee`.

Just add the following line to the top of `app.coffee`:

    autorun: coffee -c app.coffee

and watch `app.coffee` with `autorunner`:

    $ autorunner app.coffee

Note that this example could also be accomplished with `coffee -wc app.coffee` - autorunner is a more generic solution.

### Filepath Insertion

We can generalize the `autorun` script by automatically inserting the filename:

    autorun: coffee -c $FILEPATH

Here, `$FILEPATH` will be replaced with the full path to `app.coffee` before the command is run.

### Wildcard Watching

Multiple files can be watched at once by appending them to the argument list, or feeding `autorunner` a wildcard.

For example, to autorun the commands on every `.coffee` and `.rb` script in the current directory, you could use:

    $ autorunner *.coffee *.rb

## Use Cases

### Refresh Chrome when an HTML file is updated

On Mac, add the following to the top of your HTML files:

    <!---
    autorun: osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload'
    -->

Then watch them with:

    autorunner *.html

### Automatically Run a Ruby script

Add the following to your Ruby files:

    # autorun: ruby $FILEPATH

Then watch them with:

    autorunner *.rb

## Contributing

Pull requests, comments, and criticisms are welcome!
