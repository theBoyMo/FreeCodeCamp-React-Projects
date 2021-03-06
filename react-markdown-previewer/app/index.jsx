/*
    References
    [1] https://www.freecodecamp.com/challenges/build-a-markdown-previewer (project requirements)
    [2] https://codepen.io/freeCodeCamp/full/JXrLLE/ (example - code) *
    [3] http://codepen.io/micopc/full/oBWdLw/ (example - ui) *
    [4] https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet (markdown cheat sheet) *
    [5] http://codepen.io/Beaglefoot/full/zNZmRm/ (example)
    [6] http://codepen.io/tnga/full/LNmeaR/ (example with formatting toolbar)
    [7] https://simplemde.com/ & https://github.com/NextStepWebs/simplemde-markdown-editor (markdown editor toolbar)
    [8] http://codepen.io/JayV30/pen/zqBbqQ (example - code) *
    [9] http://codepen.io/saintgeo23/pen/mPoYRj (example - code, responsive)
    [10] http://codepen.io/labiej/pen/dXwvLy (example - code - includes tabs)
    [11] http://codepen.io/jchimienti/pen/YqrPMm (example - text)
    [12] http://codepen.io/ColtonBoston/pen/XKVvYq (example - code)
    [13] http://codepen.io/alamm/pen/oLOqvN (example)
    [14] https://gist.github.com/hcatlin/1027867 (scss reset style sheet)
	[15] http://pxtoem.com/
	[16] http://stackoverflow.com/questions/31081320/flexbox-stretch-textarea-in-column
    [17] https://codepen.io/raphaelgoetter/pen/NqPQBa (flexbox form)
    [18] http://stackoverflow.com/questions/4804581/css-expand-float-child-div-height-to-parents-height
    
    html/css/js tabs:
    [19] http://www.w3schools.com/howto/howto_js_tabs.asp
    [20] http://callmenick.com/post/simple-responsive-tabs-javascript-css
    [21] https://github.com/callmenick/responsive-tabs
    
    react tabs:
    [22] https://github.com/reactjs/react-tabs (npm plugin)
    [23] https://codepen.io/trey/post/tabbed-navigation-react & http://codepen.io/trey/pen/raZmej
    [24] http://blog.ricardofilipe.com/post/react-tabs-component
    [25] https://toddmotto.com/creating-a-tabs-component-with-react/ *
    [26] http://codepen.io/mihalik/pen/IHgvh (example)
    
    markdown converter and setting innerHtml using React
    [27] https://cdnjs.com/libraries/marked
    [28] https://github.com/chjj/marked (setup and use)
    [29] http://stackoverflow.com/questions/37337289/react-js-set-innerhtml-vs-dangerouslysetinnerhtml
    [30] https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml

 */

let React = require('react');
let ReactDOM = require('react-dom');

// load styles
require('style!css!sass!applicationStyles');

let Input = React.createClass({
	
	getDefaultProps: function () {
		
		let text = "Heading\n=======\n\nSub-heading\n-----------\n\n\
## Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\n\
Leave 2 spaces at the end of a line to do a line break\n\n\
Text attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\n\
Shopping list:\n\n * apples\n * oranges\n * pears\n\nNumbered list:\n\n\
 1. apples\n 2. oranges\n 3. pears\n\n\
*[Bill Fero](https://freecodecamp.com/theboymo)*";
		
		return {
			markdown: text
		}
	},
	onTextInput: function () {
		let markdown = this.refs.markdownText.value;
		if(typeof markdown == 'string' && markdown.length > 0) {
			this.props.onTextUpdate(markdown);
		} else {
			this.props.onTextUpdate('Enter your markdown in the area to the left!'); // ??
		}
	},
    render: function () {
        return (
            <div id="input-area">
                <h2 className="title">Markdown Input Area</h2>
                <textarea onKeyUp={this.onTextInput} ref="markdownText" cols="10" rows="40" placeholder={this.props.markdown} />
            </div>
        )
    }
});

let Output = React.createClass({
	// use the https://github.com/chjj/marked lib to convert markdown into plain html
	generateMarkdown: function(text) {
		console.log(`text ${text}`);
		return {
			__html: marked(text)
		}
	},
    render: function () {
        return (
            <div id="preview-area">
                <h2 className="title">Preview area</h2>
                <div id="markdown-text" dangerouslySetInnerHTML={this.generateMarkdown(this.props.markdown)}></div>
            </div>
        )
    }
});


let MarkdownPreview = React.createClass({
	getDefaultProps: function () {
		return {
			markdown: 'Enter your markdown in the area to the left!'
		}
	},
	getInitialState: function () {
		return {
			markdown: this.props.markdown
		}
	},
	handleTextInput: function (text) {
		if (typeof text == 'string' && text.length > 0) {
			this.setState({
				markdown: text
			});
		}
	},
	render: function () {
		return (
			<main id="content">
				<Input onTextUpdate={this.handleTextInput} />
				<Output markdown={this.state.markdown} />
			</main>
		)
	}
});


let App = React.createClass({
    render: function () {
        return (
            <div id="container">
                <MarkdownPreview/>
            </div>
        )
    }
});


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
