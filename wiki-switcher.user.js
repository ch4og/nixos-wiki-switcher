// ==UserScript==
// @name         NixOS Wiki Switcher
// @namespace    nixos-wiki-switcher
// @homepageURL  https://github.com/ch4og/nixos-wiki-switcher
// @version      0.1
// @description  Switches between wiki.nixos.org and nixos.wiki
// @author       ch4og
// @match        *://wiki.nixos.org/*
// @match        *://nixos.wiki/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nixos.org
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ch4og/nixos-wiki-switcher/main/wiki-switcher.user.js
// @updateURL    https://raw.githubusercontent.com/ch4og/nixos-wiki-switcher/main/wiki-switcher.user.js
// ==/UserScript==

(function() {
    'use strict';
    var url = window.location.href;

    const wikiDomain = url.includes('nixos.wiki') ? 'nixos.wiki' : 'wiki.nixos.org';
    const redirectDomain = wikiDomain === 'nixos.wiki' ? 'wiki.nixos.org' : 'nixos.wiki';
    var redirectUrl = url.replace(wikiDomain, redirectDomain);

    const redirectButton = document.createElement('button');
    redirectButton.textContent = url.includes('nixos.wiki')
      ? 'Go to wiki.nixos.org'
      : 'Go to nixos.wiki';
    redirectButton.onclick = () => {
      window.location.href = redirectUrl;
    };
    redirectButton.style.marginTop = '7px';

    const navbarBrand = document.getElementsByClassName('navbar-brand')[0];
    const headerElement = document.querySelector('header');
    const parentElement = url.includes('nixos.wiki') ? navbarBrand.parentNode : headerElement;
    const siblingElement = url.includes('nixos.wiki') ? navbarBrand.nextSibling : null;

    parentElement.insertBefore(redirectButton, siblingElement);

    redirectButton.addEventListener('click', () => {
      window.location.href = redirectUrl;
    });
})();