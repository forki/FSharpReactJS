﻿﻿var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
);

var RadioInput = React.createClass( {
    handleClick: function() {
        this.props.onChoiceSelect( this.props.choice );
    },
    render: function() {
        var disable = this.props.disable;
        var classString = !disable ?  "radio" :  "radio disabled";
        return (
            <div className={classString}>
                <label className={this.props.classType}>
                    <input type="radio" name="optionsRadios" id={this.props.index} value={this.props.choice} onChange={this.handleClick}  />
                    {this.props.choice}
                </label>
            </div>
        );
    }
} );

var QuizContainer = React.createClass( {
    getInitialState: function() {
        return {           
            choices:[],
            user_choice: "",
            is_done: false 
        };
    },
    componentDidMount: function() {
		var vhub = $.connection.simpleHub;
        var self = this;

		vhub.client.showLiveResult = function (data) {
			log.debug( "data" );
			log.debug( data );
			log.debug( "---------------------" );
			var obj = $.parseJSON(data);    
			log.debug( "obj" );
			log.debug( obj );
			log.debug( "---------------------" );
			self.setState(obj);                                         
		};  

		$.ajax({
		  url: this.props.url,
		  dataType: 'json',
		  success: function(data) {
			log.debug( "data" );
			log.debug( data );
			log.debug( "---------------------" );
			this.setState( data );
		  }.bind(this),
		  error: function(xhr, status, err) {
			log.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
   },
    selectedAnswer: function( option ) {
        this.setState( { user_choice: option } );
    },
    handleSubmit: function() {                       
                var selectedChoice = this.state.user_choice;
                 var vhub = $.connection.simpleHub;
                  $.connection.hub.start().done(function () {               
                    // Call the Send method on the hub.
                    vhub.server.send(selectedChoice);
                    // Clear text box and reset focus for next comment.                   
                });
                this.setState({ is_done: true });
     },
	render: function() {
	    log.debug( "this.state.choices" );
	    log.debug( this.state.choices );
	    log.debug( "---------------------" );
        var self = this;
 
        var choices = this.state.choices.map( function( choice, index ) {           
            return (
                <RadioInput key={choice} choice={choice} index={index} onChoiceSelect={self.selectedAnswer}  />
            );
        } );
        var button_name = "Submit";
        return(
		    <div className="quizContainer">
                <h1>Quiz</h1>
                {choices}
                <button id="submit" className="btn btn-default" onClick={this.handleSubmit}>{button_name}</button>               
            </div>
        );
     }
} );

React.render(
    <QuizContainer url="/api2/values" />,
    document.getElementById('datacontainer')
);