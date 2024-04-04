# Vsco Downloader

## DEPRECATED

This npm package no longer works as vsco has implemented a mandatory sign-up policy in order to gather all images from a users gallery. However, this is not the end. I will work on this whenever I get the chance too and will implement account downloads.

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> As the name implies, this is a tool to download vsco profiles. You can target different profiles and download the gathered images into one folder.

> There are many reasons for which one might use this tool.

- Gather images to train AI
- Get images of your friends (maybe for a birthday collage or something)
- Save images if you have lost access to your account

## Installation

```bash
npm install -g @sklyerx/vsco-dl
```

## Usage

`<>` Required

`[]` Optional

```bash
vsco-dl download <page-url> [output folder]
```

If you still need help run the following command:

```bash
vsco-dl download --help
```

The default output folder is the current working directory (cwd)
