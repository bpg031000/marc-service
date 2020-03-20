import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

ReactDOM.render(<Navigation />, document.getElementById("navigation"));

ReactDOM.render(<Footer />, document.getElementById("footer"));