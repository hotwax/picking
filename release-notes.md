# Release 1.8.0

## What's Changed
* Improved: Show picklist ID for the picklist with name (#124) by @adityasharma7 in https://github.com/hotwax/picking/pull/133

**Full Changelog**: https://github.com/hotwax/picking/compare/v1.7.0...v1.8.0

# Release 1.7.0

## What's Changed
* Implemented: usage of performFind for fetching picklist details (#85zry5kg0) by @k2maan in https://github.com/hotwax/picking/pull/121
* Fixed: picklist filters not being reset on logout (#125) by @adityasharma7 in https://github.com/hotwax/picking/pull/129
* Implemented: Pull to refresh on picklists screen (#123) by @adityasharma7 in https://github.com/hotwax/picking/pull/130
* Implemented: Support for external scanner (#126) by @adityasharma7 in https://github.com/hotwax/picking/pull/131


**Full Changelog**: https://github.com/hotwax/picking/compare/v1.6.1...v1.7.0

# Release 1.6.1

## What's Changed
* Fixed: picker name missing for some picklists by @k2maan in https://github.com/hotwax/picking/pull/118

**Full Changelog**: https://github.com/hotwax/picking/compare/v1.6.0...v1.6.1

# Release 1.6.0

## What's Changed
* Implemented picklist filters and UI for showing recently completed picklists (#1x699zj) by @k2maan in https://github.com/hotwax/picking/pull/108

**Full Changelog**: https://github.com/hotwax/picking/compare/v1.5.0...v1.6.0

# Release 1.5.0

## What's Changed
* Implemented: support to sort picklists by Product Name, Bin ID and Location Sequence ID and added option on settings page to change the sort option(#85zrtk08m) by @k2maan in https://github.com/hotwax/picking/pull/113


**Full Changelog**: https://github.com/hotwax/picking/compare/v1.4.0...v1.5.0

# Release 1.4.0

## What's Changed
* Improved: UI of Settings page(#32j3r6t) by @shashwatbangar in https://github.com/hotwax/picking/pull/92
* Added hotwax-apps-theme package(#85zrj08rb) by @disha1202 in https://github.com/hotwax/picking/pull/100
* Added support to change timezone and migrated from moment to luxon (#85zrhudt7) by @k2maan in https://github.com/hotwax/picking/pull/102
* Implemented: Code to show app version & build information on Settings page (#85zrhn8w8) by @k2maan in https://github.com/hotwax/picking/pull/103 and @shashwatbangar in https://github.com/hotwax/picking/pull/101
* Implemented: support for using api and client methods from OMS api package (#85zrm1ktj) by @k2maan in https://github.com/hotwax/picking/pull/106
* Fixed: code to show cursor while hovering on picklist (#85zrnrmdh) by @k2maan in https://github.com/hotwax/picking/pull/107


**Full Changelog**: https://github.com/hotwax/picking/compare/v1.3.0...v1.4.0

# Release 1.3.0

## What's Changed
* Implemented autodeploy flow for UAT (#31ngcmh) by @k2maan in https://github.com/hotwax/picking/pull/90
* Implemented message display in UI when no picklists found (#31fnaw8) by @k2maan in https://github.com/hotwax/picking/pull/91
* Upgraded to ionic 6.2.9 (#2w9wz26)  by @k2maan and @shashwatbangar in https://github.com/hotwax/picking/pull/95 and https://github.com/hotwax/picking/pull/94


**Full Changelog**: https://github.com/hotwax/picking/compare/v1.2.0...v.1.3.0

# Release 1.2.0
## What's Changed
* Added GitHub contribution badge by @Vanshiii203 in https://github.com/hotwax/picking/pull/73
* used console.error instead of console.log by @divyanshugour in https://github.com/hotwax/picking/pull/79
* Fixed 'something went wrong' toast appearing on tab switch (#1x0k51t) by @k2maan in https://github.com/hotwax/picking/pull/87
* Added support to alias specific instance URL with environment configuration(#30dkjp1) by @disha1202 in https://github.com/hotwax/picking/pull/88

## New Contributors
* @Vanshiii203 made their first contribution in https://github.com/hotwax/picking/pull/73
* @divyanshugour made their first contribution in https://github.com/hotwax/picking/pull/79
* @k2maan made their first contribution in https://github.com/hotwax/picking/pull/87

**Full Changelog**: https://github.com/hotwax/picking/compare/v1.1.0...v1.2.0

# Release 1.1.0

## What's Changed
* updated title of picking app (#1w9gm4n) by @Utkarshkaraiya in https://github.com/hotwax/picking/pull/28
* Implemented code to take instanceUrl from user and use it (#1wf8d38) by @bashu22tiwari in https://github.com/hotwax/picking/pull/29
* Added: condition to hide the list-header when picklist is empty(#25) by @ymaheshwari1 in https://github.com/hotwax/picking/pull/27
* Improved: code to prepare loader on app mounted and assign it to null on dismiss(#1x68xu9) by @Yashi002 in https://github.com/hotwax/picking/pull/35
* Implemented code to display current OMS information on settings page(… by @disha1202 in https://github.com/hotwax/picking/pull/38
* Fixed the position of input label on login page (#1ym3jwv) by @azkyakhan in https://github.com/hotwax/picking/pull/40
* Added md mode (#1zax3p6) by @bashu22tiwari in https://github.com/hotwax/picking/pull/44
* Updated the markup #1y2ract by @disha1202 in https://github.com/hotwax/picking/pull/42
* Improved code by using logo component for light and dark theme on login page (#1zw59ab) by @azkyakhan in https://github.com/hotwax/picking/pull/46
* Updated the version of vue barcode reader(#1zax2tg) by @disha1202 in https://github.com/hotwax/picking/pull/43
* Added firebase deployment configuration(#20d6xcu) by @disha1202 in https://github.com/hotwax/picking/pull/47
* Revert "Added firebase deployment configuration(#20d6xcu)" by @adityasharma7 in https://github.com/hotwax/picking/pull/51
* Removed fullscreen=true from ion-content of all pages(#21aqct8) by @azkyakhan in https://github.com/hotwax/picking/pull/49
* Updated color of ion-icon in ion-chip, ion-chip outline and ion-item lines in dark mode(#238p38r) by @azkyakhan in https://github.com/hotwax/picking/pull/53
* Improved: code to remove login error when having spaces in the fields (#20jwqu1). by @meet-aniket in https://github.com/hotwax/picking/pull/56
* Improved: code to pass viewSize in all list queries (#24pfzq8). by @meet-aniket in https://github.com/hotwax/picking/pull/55
* Added firebase deployment configuration(#20d6xcu) by @adityasharma7 in https://github.com/hotwax/picking/pull/52
* Fixed: Instance URL should be case insensitive(#2ft61zw) by @rathoreprashant in https://github.com/hotwax/picking/pull/62
* Improved: code to hide option to set baseURL if value available in '.env' file (#29wgkkh) by @Mayank909 in https://github.com/hotwax/picking/pull/58
* Improved label to "eCom Store" on Settings page (#23tw4yf) by @rathoreprashant in https://github.com/hotwax/picking/pull/65
* Added PWA Configuration (#226cynn) by @Mayank909 in https://github.com/hotwax/picking/pull/54
* Implemented: Added PWA Configuration(#226cynn) by @shashwatbangar in https://github.com/hotwax/picking/pull/66
* Update contribution guideline in Readme file(#2r0kmb3) by @azkyakhan in https://github.com/hotwax/picking/pull/68
* Implemented: Code to check if user has permission to access the app(#2hr41aq) by @shashwatbangar in https://github.com/hotwax/picking/pull/67

## New Contributors
* @bashu22tiwari made their first contribution in https://github.com/hotwax/picking/pull/29
* @Yashi002 made their first contribution in https://github.com/hotwax/picking/pull/35
* @meet-aniket made their first contribution in https://github.com/hotwax/picking/pull/56
* @rathoreprashant made their first contribution in https://github.com/hotwax/picking/pull/62
* @Mayank909 made their first contribution in https://github.com/hotwax/picking/pull/58
* @shashwatbangar made their first contribution in https://github.com/hotwax/picking/pull/66

**Full Changelog**: https://github.com/hotwax/picking/compare/v1.0.0...v1.1.0

# Release 1.0.0

Initial app comes with following functionality:
1. User(Picker) can login into the system.
2. All picklists assigned to user are available on list or home page.
3. User can navigate to picklist detail page, scan product with Barcode\QR code and mark picklist as picked.
4. User can change stores if associated with multiple stores.

Features:
1. Implemented code to add functionality to the list page (https://github.com/hotwax/pickingapp/pull/10)
2. Implemented functionality to picklist detail page (https://github.com/hotwax/pickingapp/pull/19)
3. Implement barcode and QR code scanner  (https://github.com/hotwax/pickingapp/pull/20)
