# react-data-tooltip

## Usage

```js
// in your App.js or index.js or anywhere you can assure the <ReactDataTooltip> component will mounted on
import ReactDataTooltip from 'react-data-tooltip';

function App() {
  return (
    <div>
      <ReactDataTooltip />
    </div>
  )
}

// anywhere in your html or react element
<div data-tooltip="my first tool tip"></div>
<AComponent data-tooltip="my second tool tip" data-tooltip-delay="400"></AComponent>

```

## Installation

`npm install --save react-data-tooltip`

## API

`data-tooltip`: `non-empty string`
`data-tooltip-delay`: `number in ms`
