const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var terminal = {

    'start_app': function () {
    
            // here you can see how appName is printed -> 'node_terminal_app'
            console.log(terminal.appName + '\n')
            
            // then we ask the user for their first prompt: 
            return readline.question('\x1b[96mnode: \x1b[0m', terminal.next)
	},
	
	'next': function (input) {

            // log everything (except empty strings)
            
            if (![undefined,''].includes(input)) terminal.log(input);
              
            // if command exists : run command.
            
            if (terminal[input]) return terminal[input](input)
            
            // if command does not exist : print error message.
            
            if (!terminal[input] && ![undefined, ''].includes(input))
            
            console.error('error: no matching terminal command found.', 'command : ' + input)
            
            // recursively prompt the user again :
            	
            return readline.question('\x1b[96mnode: \x1b[0m', terminal.next)

			// ^ two things:
		
			// 1. why is this before and after 'node: ' ? \x1b[96m && \x1b[0m
			// try removing those and see what happens...

			// 2. after the prompt, there's a comma, then -> 'terminal.next'

			// 'next' is another that's part of our terminal, but why?
	},
	
	'simple_program': function(input) {
	
	    // this simple program uses node's "read line" module, 
	    // specifically its "question" function / feature
	    // to ask the user for input, then,
	    // returns, or "runs" another function (called a 'callback')
	    // with the provided user's input (string) as an argument.
	    
	     readline.question('which OS? e.g. Mac, Windows', (input) => {
	        console.log('you are using: ' + input)
	        terminal.next();
	    })
	},
	
	'new_command': function(input) {
	
	    // write a function that prints: your name plus your last name with two separate inputs

       console.log('testing new command... ')
       
       // can you explain to me what this line does?
       // are there cases where it could break? 
       terminal.next();
	},
	
	// utility functions
    'log':   function (newEntry) {terminal.history.push(newEntry); terminal.logCount += 1},
    'clear': function () {console.clear(); terminal.next()},
    'quit':  function () {terminal.dump(); readline.close();},
    'dump':  function () {console.log(`Hist: ${terminal.history}\nLog count: ${terminal.logCount}`); terminal.next();},
    
    // static data
    'history': [],
    'logCount': 0,
    'lines': [],
    
    // Can you think of a way you could use these data structures to solve challenge #1?
    'hint_1': {},
    'hint_2': "",
    'hint_3': [],

    'lineCount': 1,
    'appName': `
    
███╗   ██╗ ██████╗ ██████╗ ███████╗             ██╗███████╗   ████████╗
████╗  ██║██╔═══██╗██╔══██╗██╔════╝             ██║██╔════╝   ╚══██╔══╝
██╔██╗ ██║██║   ██║██║  ██║█████╗               ██║███████╗█████╗██║   
██║╚██╗██║██║   ██║██║  ██║██╔══╝          ██   ██║╚════██║╚════╝██║   
██║ ╚████║╚██████╔╝██████╔╝███████╗███████╗╚█████╔╝███████║      ██║   
╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚════╝ ╚══════╝      ╚═╝  
 ### TERMINAL 
 ##
 # v0
 `
}

terminal['start_app']();

