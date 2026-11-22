const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

var terminal = {

    'start_app': function () {
    
            // here you can see where the app name is printed -> 'node_terminal_app'
            console.log(terminal.appName + '\n')
            
            // then we ask the user for their first prompt: 
            return readline.question('\x1b[96mnode: \x1b[0m', terminal.next)

			// two things:
		
			// 1. why is this before and after 'node: ' ? \x1b[96m && \x1b[0m
			// try removing those and see what happens...

			// 2. after the prompt, there's a comma, then -> 'terminal.next'

			// 'next' is another that's part of our terminal, but why?
	},
	
	'next': function (input) {

            // log everything (except empty strings)
            if (![undefined,''].includes(input)) terminal.log(input);
            
            // if command exists : 
            if (terminal[input]) return readline.question(input + ': ', terminal[input]);
            
            // if command does not exist : 
            if (!terminal[input] && ![undefined, ''].includes(input))
                console.error('error: no matching terminal command found.', 'command : ' + input)
                
            // recursively prompt the user again :
            return readline.question('\x1b[96mpal: \x1b[0m', terminal.next)
	},
	
	// utility functions
    'log':   function (newEntry) {terminal.history.push(newEntry); terminal.logCount += 1},
    'clear': function () {console.clear(); terminal.next()},
    'quit':  function () { terminal.dump(); readline.close(); },
    'dump':  function () {console.log(`Hist: ${terminal.history}\nLog count: ${terminal.logCount}`); terminal.next();},
    
    // static data
    'history': [],
    'logCount': 0,
    'lines': [],
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
    `,
}

terminal['start_app']();
