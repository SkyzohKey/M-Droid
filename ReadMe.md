# ![M-Droid logo](src/assets/images/logos/logo-light.png)

[![Build Status](https://www.bitrise.io/app/ea52905e61d6d07c/status.svg?token=_Ya26yC8o5C93IMPhdTZkQ&branch=master)](https://www.bitrise.io/app/ea52905e61d6d07c)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSkyzohKey%2FM-Droid.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FSkyzohKey%2FM-Droid?ref=badge_shield)

### Unofficial Material Designed client for F-Droid!

This is M-Droid, a drop-in replacement for the F-Droid client. It provides the same features but in a Material Design way that is both nice to see and easy to use.

This project started because I hate the new F-Droid UI while still loving the actual software. And as I like React-Native, this is a good project for me.

[![Become a patron](https://i.imgur.com/oWouhEe.png)](https://www.patreon.com/bePatron?u=2330345)

[<img src="https://f-droid.org/badge/get-it-on.png"
     alt="Get it on F-Droid"
     height="80">](https://f-droid.org/packages/com.mdroid/)

[See the Medium story](https://medium.com/@SkyzohKey/tl-dr-i-started-developing-mdroid-2-weeks-ago-as-a-side-project-when-i-saw-that-a-new-version-v1-d1f32a98ee0b) - [See the Patreon post](https://www.patreon.com/posts/mdroid-open-for-16329680)

#### Table of Contents

* [Features](#features)
* [How it works?](#how-it-works)
* [Screenshots](#screenshots)
* [Default repositories](#default-repositories)
* [Contributing](#contributing)
* [Compile & run](#compile--run)
* [Donations](#donations)
* [License](#license)

## Features

MDroid attempts to mimic F-Droid features as much as possible, in a Material design fashion. Here's a (not ordered) list of actual MDroid's features:

* Clean UI following the Material Design specifications
* Fetching multiple [repositories](#default-repositories)
* Curated main screen showing somes apps from each categories
* View app's details
* Download and install any app from repositories
* Search for apps (fuzzy search, super fast)
* Manage (add, edit, delete) your repositories

## How it works?

Basically you add your repositories of choice (along with the F-Droid, F-Droid Archive & Guardian ones) then the client will send some GET requests to actually get the content of the `https://${repoBaseUrl}/index.xml` file who's contains the repo.

Then it parse that file by converting the XML to JSON format, for better code efficiency. Cache the parsed stuffs and display the informations in a great way for the user.

That's Simple (c).

## Screenshots

The screenshots may not be up-to-date. This is currently an early stage for the project and I'll try to update screenshots as many as possible.

![2nd step: Prepare the UI!](https://i.imgur.com/h7zoYHE.png)
![3rd step: Display apps informations!](https://i.imgur.com/hZtGh6j.png)
![3rd step: moar informations!](https://i.imgur.com/HcI1KVu.png)
![3rd-bis step: even mooooar informations!](https://i.imgur.com/MwX8YB3.png)
![4th step: Install the app!](https://i.imgur.com/yAjibIB.png)
![5th step: Search (fuzzy)!](https://i.imgur.com/9aCzPpE.png)
![6th step: Repositories managment](https://i.imgur.com/wIEUjmK.png)

## Default repositories

Here is the list of included repositories by default. There is no way to change which repositories the app will fetch for now, but that's definitly a planned feature.

* [Official F-Droid repo](https://f-droid.org/repo)
* [The Guardian repo](https://guardianproject.info/fdroid/repo)
* [The Guardian archives repo](https://guardianproject.info/fdroid/archive)
* [Signal repo](https://eutopia.cz/fdroid/repo)
* [Grote's Transportr repo](https://grobox.de/fdroid/repo)
* [MicroG repo](https://microg.org/fdroid/repo)
* [The Briar Project repo](https://briarproject.org/fdroid/repo)
* [Krombel's repo](http://fdroid.krombel.de/repo)
* [Copperhead's repo](https://fdroid.copperhead.co/repo)

## Contributing

This is a fairly simple project so I doubt anyone is willing to contribute, but if that's the case it super simple. You can either help to [catch bugs and report them](https://github.com/SkyzohKey/M-Droid/issues), [send a pull request](https://github.com/SkyzohKey/M-Droid/pulls) (ESLint is configured) or just show some interest in the project!

## Compile & run

This is a React Native project and by so it is super simple to build&run. Just do the following in a shell:

```sh
# Get the source & dependencies
$ git clone https://github.com/SkyzohKey/M-Droid.git
$ cd M-Droid
$ yarn # or npm install

# Run the packager
$ react-native start

# Start the app on a simulator/device
$ react-native run-android --variant=debug # or production for enhanced perfs.
```

## Donations

I currently work on this project during my free-time, but also during my work-time. As I'm my own boss, I take work time to work on personnal projects that I really believes in. But during this time, I don't win any money. I'm not doing that for money.

Anyway, if you consider support me, you can pay me a pack of Monster's cans for moore productive coding, :D.

I accept donations in form of Monero, Bitcoin and Etherum. You can also Patreon me !

#### Monero

```
47XpVhUHahViCZHuZPc2Z6ivLraidX7AxbM8b2StdPcQGwjDGY14eqj9ippW7Pdrqj9d2y4xvwChzePQAqG1NvqQ775FKxg
```

#### Bitcoin

```
18BqyV9mNbFLi5HNNnfUprnPJyJDFP59Xh
```

#### Ethereum

```
0xe96357E4Dabd51970Bf8fcF9633Cc0c70712466e
```

#### Patreon

[![Become a patron](https://i.imgur.com/oWouhEe.png)](https://www.patreon.com/bePatron?u=2330345)

If you wish to support me, but doesn't have money for, you can still message me on Wire and give me some free hugs! :D

* Wire handle: **@SkyzohKey**

## License

This project is licensed under [The MIT License](LICENSE).


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FSkyzohKey%2FM-Droid.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FSkyzohKey%2FM-Droid?ref=badge_large)
