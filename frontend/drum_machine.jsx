const React = require ('react');
const ReactDOM = require ('react-dom');
const DrumPad = require('./components/drum_pad.jsx');
const Sequencer = require('./components/sequencer.jsx');
const Sounds = require('./components/sounds.jsx');
const Instructions = require('./components/instructions.jsx');
const ToneMatrix = require('./components/tonematrix.jsx');


const App = React.createClass({
  getInitialState: function() {
    return {tutorial: false};
  },
  componentDidMount: function() {
    $('.tutorial').html("<span class='skip'>(Click here to skip)</span><h1>Let's make a beat.</h1><h2 class='add-beat'>Add a <span style='color:#e62e00'>sub</span> on the 1, 4, 6 and 8 and a <span style='color:#4bea0d'>snare</span> on the 3, 7, 11 and 15. <br /> Click the corresponding cells on the sequencer below then press play.</h2><h2 class='add-freestyle'>Try some freestyling.</h2><h2 class='add-freestyle'>Right when the red timeline enters a <span style='color:#F3F315'>yellow</span> square below, click the corresponding key on your keyboard.</h2><h2 class='second-freestyle'>Let's step it up. After all, what's a hip hop beat these days without some guy yelling 'What?' in the background? <br /> Same directions as before, just with another key to press!<h2 class='end-tutorial'>Good stuff! Now you're ready to produce on your own.");
    window.setTimeout(this._showSequencer, 2000);
    let that = this;
    $('.skip').on('click', function() {

      that.setState({tutorial: false});
    });
    $('.instructions').css('color', 'transparent');
    $('.pad-layout').css('margin-left', '-87px');
  },
  _showSequencer: function() {
    // $('.tutorial').css("min-height", "353px");
    $('.tutorial').animate( { height:"353px" }, { queue:false, duration:500,
      complete: function() {
        $('.add-beat').fadeIn('slow', function() {
          $("td:contains('Snare')").attr("style", "color: #4bea0d");
          $("td:contains('Sub')").attr("style", "color: #e62e00");
        });
      }
    });

    $("button").eq(0).on('click', this._showPad);

  },

  _showPad: function() {
    this.t = (16/(140/60)) * 1000;
    let that = this;
    window.setTimeout(function() {
      $("button").eq(0).off('click');
      $('.tutorial').animate( { width:"680px" }, { queue:false, duration:500});
      $("button").eq(0).click();
      $('.add-beat').fadeOut('slow', function() {
        $('.add-freestyle').fadeIn('slow', that._startFreestyle());
      });
    }, this.t);

  },

  _startFreestyle: function() {
    let secondRound = false;
    let first = true;
    let that = this;
    let interval = 50;
    let re = /\d+/i;
    $("li.note-step[data-pad='six']").eq(0).css({"box-shadow": "2px 2px 30px #F3F315", "position": 'relative', 'top': '-5px'});
    $("li.note-step[data-pad='six']").eq(0).html('w');
    $("li.note-step[data-pad='six']").eq(3).css({"box-shadow": "2px 2px 30px #F3F315", "position": 'relative', 'top': '-5px'});
    $("li.note-step[data-pad='six']").eq(3).html('w');
    $("li.note-step[data-pad='six']").eq(5).css({"box-shadow": "2px 2px 30px #F3F315", "position": 'relative', 'top': '-5px'});
    $("li.note-step[data-pad='six']").eq(5).html('w');
    $("li.note-step[data-pad='six']").eq(6).css({"box-shadow": "2px 2px 30px #F3F315", "position": 'relative', 'top': '-5px'});
    $("li.note-step[data-pad='six']").eq(6).html('w');
    if (first) {
      $("li.note-step[data-pad='four']").eq(13).css({"box-shadow": "2px 2px 30px #F3F315", "position": 'relative', 'top': '-5px'});
      $("li.note-step[data-pad='four']").eq(13).html('q');
    }
    $("button").eq(0).on('click', function() {

      $("button").off('click');
      let int = window.setInterval(function() {
        let time = parseInt($('.timeline').attr('style').match(re));

        if (secondRound && time > 895 && this.state.tutorial) {
          if (first) {
            first = false;
          }
          $("li.note-step[data-pad='four']").eq(13).css("box-shadow", "0px -1px 5px white");
          $("li.note-step[data-pad='five']").eq(13).css({"box-shadow": "2px 2px 30px #F3F315", "position": 'relative', 'top': '-5px'});
          $("li.note-step[data-pad='five']").eq(13).html('a');
          $("li.note-step[data-pad='four']").eq(13).html('');
          secondRound = false;
        } else if (!secondRound && time > 895 && this.state.tutorial) {

          $("li.note-step[data-pad='five']").eq(13).css("box-shadow", "0px -1px 5px white");
          $("li.note-step[data-pad='four']").eq(13).css({"box-shadow": "2px 2px 30px #F3F315", "position": 'relative', 'top': '-5px'});
          $("li.note-step[data-pad='four']").eq(13).html('q');
          $("li.note-step[data-pad='five']").eq(13).html('');
          secondRound = true;
        }
        //
        // if (time === 100) {
        //
        //   $('.p1').css("box-shadow", "2px 2px 50px #F3F315");
        //
        //   that._turnOffRed('.p1');
        // }
        // if (time === 100 + 3*interval) {
        //
        //   $('.p1').css("box-shadow", "2px 2px 50px #F3F315");
        //   that._turnOffRed('.p1');
        // }
        // if (time === 100 + 5*interval) {
        //
        //   $('.p1').css("box-shadow", "2px 2px 50px #F3F315");
        //   that._turnOffRed('.p1');
        // }
        // if (time === 101 + 6*interval) {
        //
        //   $('.p1').css("box-shadow", "2px 2px 50px #F3F315");
        //   that._turnOffRed('.p1');
        // }
        // if (time === 100 + 13*interval) {
        //
        //   if (secondRound) {
        //
        //     $('.p3').css("box-shadow", "2px 2px 50px #F3F315");
        //     secondRound = false;
        //     that._turnOffRed('.p3');
        //
        //   } else {
        //
        //     $('.p0').css("box-shadow", "2px 2px 50px #F3F315");
        //     secondRound = true;
        //     that._turnOffRed('.p0');
        //   }
        // }



      }, 10);

        $("button").eq(0).on('click', function() {
          $("button").eq(0).off('click');
          window.clearInterval(int);

          if (that.second) {
            window.clearInterval(int);
            $('.second-freestyle').fadeOut('slow', function() {
              $('.end-tutorial').fadeIn('slow', function() {
                window.setTimeout( function() {

                  that.setState({tutorial: false});
                  $('li.note-step').html('');
                  $('li.note-step').css({"box-shadow": "0px -1px 5px white", "position": 'inherit', 'top': '0'});
                  $('.tutorial').animate({ height:"353px" }, { queue:false, duration:500});
                }, 1500);
              });
            });
          } else {
            $('.add-freestyle').fadeOut('slow', function() {
              that.second = true;
              $('.second-freestyle').fadeIn('slow', that._startSecondFreestyle());
            });
          }
        });
    });
  },

  _turnOffRed: function(klass) {
    window.setTimeout(function() {
      $(klass).css("box-shadow", "2px 2px 10px white");
    }, 300);
  },

  _startSecondFreestyle: function() {

    $('.pad-sounds').append(
      `<audio id='p4'>
      <source src='https://s3-us-west-1.amazonaws.com/soundsamples/LEX+Chant.wav'/>
      </audio>`
    );
    $('.p4').append(`<p class='inst'>Lex Chant</p>`);
    $("li.note-step[data-pad='seven']").eq(2).css({"box-shadow": "2px 2px 30px #F3F315"});
    $("li.note-step[data-pad='seven']").eq(2).html('s');
    $("li.note-step[data-pad='seven']").eq(6).css({"box-shadow": "2px 2px 30px #F3F315"});
    $("li.note-step[data-pad='seven']").eq(6).html('s');
    $("li.note-step[data-pad='seven']").eq(10).css({"box-shadow": "2px 2px 30px #F3F315"});
    $("li.note-step[data-pad='seven']").eq(10).html('s');
    $("li.note-step[data-pad='seven']").eq(14).css({"box-shadow": "2px 2px 30px #F3F315"});
    $("li.note-step[data-pad='seven']").eq(14).html('s');
    this._startFreestyle();

  },

  render: function() {
    if (true) {
      return (
        <div>
          <ToneMatrix />
          <Sounds />
        </div>
      );
    }
    if (this.state.tutorial) {
      return (
      <div>
          <div className='upper-container'>
            <Sounds />
            <Instructions />
            <DrumPad />
          </div>
          <Sequencer tutorial={this.state.tutorial} clicked={[[],[],[],[],[]]}/>
          <div className="tutorial">

          </div>
      </div>

      );
    }
    return (
      <div>


          <div className='upper-container'>

            <Instructions />
            <DrumPad />
            <Sounds />
          </div>
          <Sequencer tutorial={this.state.tutorial} clicked={[[2,6,10,14],[0,3,5,6],[13],[2,6,10,14],[0,3,5,7]]}/>

    </div>
    );
  }
});

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<App />, document.getElementById('content'));
});
