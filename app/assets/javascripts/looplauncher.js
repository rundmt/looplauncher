// = require jquery
// = require jquery_ujs
// = require jquery.ui.all


  $(document).ready(function(){    
    function BufferLoader(context, urlList, callback) {
      this.context = context;
      this.urlList = urlList;
      this.onload = callback;
      this.bufferList = new Array();
      this.loadCount = 0;
    }
    BufferLoader.prototype.loadBuffer = function(url, index) {
      // Load buffer asynchronously
      var request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";

      var loader = this;

      request.onload = function() {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
          request.response,
          function(buffer) {
            if (!buffer) {
              alert('error decoding file data: ' + url);
              return;
            }
            loader.bufferList[index] = buffer;
            if (++loader.loadCount == loader.urlList.length)
              loader.onload(loader.bufferList);
          },
          function(error) {
            console.error('decodeAudioData error', error);
          }
        );
      }

      request.onerror = function() {
        alert('BufferLoader: XHR error');
      }

      request.send();
    };

    BufferLoader.prototype.load = function() {
      for (var i = 0; i < this.urlList.length; ++i)
      this.loadBuffer(this.urlList[i], i);
    };

    function init() {
      context = new webkitAudioContext();

      bufferLoader = new BufferLoader(
        context,
        [
          "\\Audio\\ProjectLoops2-Audio.ogg",
          '\\Audio\\ProjectLoops4-Audio.ogg',
          '\\Audio\\ProjectLoops3-Audio.ogg',
          '\\Audio\\Flashback_Accapella.mp3',
        ],
        finishedLoading
        );

      bufferLoader.load();
    }

    function finishedLoading(bufferList) {
      // Create two sources and play them both together.
    
    source1 = null;
    source2 = null;
    source3 = null;
    source4 = null;
    gainNode1 = context.createGain();
    gainNode2 = context.createGain();
    gainNode3 = context.createGain();
    gainNode4 = context.createGain();
    gainNode1.gain.value = .5;
    gainNode2.gain.value = .5;
    gainNode3.gain.value = .5;
    gainNode4.gain.value = .5;
    var lowfilter = context.createBiquadFilter();
    lowfilter.type = 5;  
    lowfilter.frequency.value = 5000;
    lowfilter.Q.value = 10;
    lowfilter.gain.value = 5 ;
    console.log("Filter Freq " + lowfilter.frequency.value);

    function lowfilterslide(){
    $( "#freq-vertical" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 10,
        value: 5,
        slide: function( event, ui ) {
          lowfilter.gain.value = (ui.value);
          console.log("Filter Freq " + lowfilter.gain.value);
        }
      });
    }

    master = context.createGain();
    master.gain.value = .75;
    master.connect(lowfilter);
    lowfilter.connect(context.destination);
    lowfilterslide();

    master_tempo = $('#master_tempo').val();     
    $('.tempo').change(function(){
      master_tempo = $('#master_tempo').val();      
      console.log("master tempo is "+master_tempo);
    });

  
      function masterVol(){
    $( "#master_volume" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 100,
        value: 50,
        slide: function( event, ui ) {
          master.gain.value = (ui.value/100);
          console.log("Gain 1 " +master.gain.value);
        }
      });
    }

      
    

  

      function play1(){
        stop1();
        source1 = context.createBufferSource();
        source1.noteOff(0);    
        source1.buffer = bufferList[0];
        source1.loop = true;
        source1.connect(gainNode1);
        var song_tempo = $('#song_tempo1').val(); 
        var current_tempo = master_tempo/song_tempo;
        console.log("Current tempo " + current_tempo);
        source1.playbackRate.value = current_tempo;
        $('.tempo').change(function(){
          var song_tempo = $('#song_tempo1').val();      
          var current_tempo = master_tempo/song_tempo;
          source1.playbackRate.value = current_tempo;
          console.log("Current tempo " + current_tempo);
        });        
        
        console.log(gainNode1.gain.value);
        gainNode1.connect(master);
        // master.connect(context.destination);
        source1.noteOn(0);
      }
      function stop1() {
        if (source1) {
          source1.noteOff(0);
        }
      }
       $('#start1').click(function(){
        play1();
      });
      $('#stop1').click(function(){
        stop1();
      });
      function volSlide1(){
    $( "#slider-vertical1" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 50,
        slide: function( event, ui ) {
          gainNode1.gain.value = (ui.value/100);
          console.log("Gain 1 " +gainNode1.gain.value);
        }
      });
    }
      volSlide1();

      function play2(){
        stop2();
        source2 = context.createBufferSource();
        source2.noteOff(0);    
        source2.buffer = bufferList[1];
        source2.loop = true;
        source2.connect(gainNode2);
        var song_tempo = $('#song_tempo2').val(); 
        var current_tempo = master_tempo/song_tempo;
        console.log("Current tempo " + current_tempo);
        source2.playbackRate.value = current_tempo;
        $('.tempo').change(function(){
          var song_tempo = $('#song_tempo2').val();      
          var current_tempo = master_tempo/song_tempo;
          source2.playbackRate.value = current_tempo;
          console.log("Current tempo " + current_tempo);
        });        
        console.log(gainNode2.gain.value);
        gainNode2.connect(master);
        // master.connect(context.destination);
        source2.noteOn(0);
      }
      function stop2() {
        if (source2) {
          source2.noteOff(0);
        }
      }
      $('#start2').click(function(){
        play2();
      });
      $('#stop2').click(function(){
        stop2();
      });
      function volSlide2(){
    $( "#slider-vertical2" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 50,
        slide: function( event, ui ) {
          gainNode2.gain.value = (ui.value/100);
          console.log("Gain 2 " + gainNode2.gain.value);
        }
      });
    }
      volSlide2();

      function play3(){
        stop3();
        source3 = context.createBufferSource();
        source3.noteOff(0);    
        source3.buffer = bufferList[2];
        source3.loop = true;
        source3.connect(gainNode3);
        var song_tempo = $('#song_tempo3').val(); 
        var current_tempo = master_tempo/song_tempo;
        console.log("Current tempo " + current_tempo);
        source3.playbackRate.value = current_tempo;
        $('.tempo').change(function(){
          var song_tempo = $('#song_tempo3').val();      
          var current_tempo = master_tempo/song_tempo;
          source3.playbackRate.value = current_tempo;
          console.log("Current tempo " + current_tempo);
        });        
        console.log(gainNode3.gain.value);
        gainNode3.connect(master);
        // master.connect(context.destination);
        source3.noteOn(0);
      }
      function stop3() {
        if (source3) {
          source3.noteOff(0);
        }
      }
      $('#start3').click(function(){
        play3();
      });
      $('#stop3').click(function(){
        stop3();
      });
          function volSlide3(){
    $( "#slider-vertical3" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 50,
        slide: function( event, ui ) {
          gainNode3.gain.value = (ui.value/100);
          console.log("Gain 3 " + gainNode3.gain.value);
        }
      });
    }
      volSlide3();

      function play4(){
        stop4();
        source4 = context.createBufferSource();
        source4.noteOff(0);    
        source4.buffer = bufferList[3];
        source4.loop = true;
        source4.connect(gainNode4);
        var song_tempo = $('#song_tempo4').val(); 
        var current_tempo = master_tempo/song_tempo;
        console.log("Current tempo " + current_tempo);
        source4.playbackRate.value = current_tempo;
        $('.tempo').change(function(){
          var song_tempo = $('#song_tempo4').val();      
          var current_tempo = master_tempo/song_tempo;
          source4.playbackRate.value = current_tempo;
          console.log("Current tempo " + current_tempo);
        });        
        console.log(gainNode4.gain.value);
        gainNode4.connect(master);
        // master.connect(context.destination);
        source4.noteOn(0);
      }
      function stop4() {
        if (source4) {
          source4.noteOff(0);
        }
      }
      $('#start4').click(function(){
        play4();
      });
      $('#stop4').click(function(){
        stop4();
      });
        function volSlide4(){
    $( "#slider-vertical4" ).slider({
        orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 50,
        slide: function( event, ui ) {
          gainNode4.gain.value = (ui.value/100);
          console.log("Gain 4 " + gainNode4.gain.value);
        }
      });
    }
    $('#playall').click(function(){
        play1();
        play2();
        play3();
        play4();
      });
      $('#stopall').click(function(){
        stop1();
        stop2();
        stop3();
        stop4();
      });
      volSlide4();
      masterVol();

    }
    
      
      init();    
      

      });