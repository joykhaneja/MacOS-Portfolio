
const bootLines = [
    '[ OK ] Booting Linux kernel 6.8.12-arch1-1...',
    '[ OK ] Initializing cgroup subsys cpuset',
    '[ OK ] Initializing cgroup subsys cpu',
    '[ OK ] Initializing cgroup subsys cpuacct',
    '[ OK ] Initializing cgroup subsys memory',
    '[ OK ] Initializing cgroup subsys devices',
    '[ OK ] Initializing cgroup subsys freezer',
    '[ OK ] Initializing cgroup subsys net_cls',
    '[ OK ] Initializing cgroup subsys blkio',
    '[ OK ] Initializing cgroup subsys perf_event',
    '[ OK ] Initializing cgroup subsys net_prio',
    '[ OK ] Initializing cgroup subsys hugetlb',
    '[ OK ] Initializing cgroup subsys pids',
    '[ OK ] Initializing cgroup subsys rdma',
    '[ OK ] Loading initial ramdisk',
    '[ OK ] Mounting proc filesystem',
    '[ OK ] Mounting sysfs filesystem',
    '[ OK ] Mounting devtmpfs on /dev',
    '[ OK ] Mounting tmpfs on /run',
    '[ OK ] Starting udev Kernel Device Manager',
    '[ OK ] Loading kernel modules',
    '[ OK ] Applying kernel sysctl settings',
    '[ OK ] Creating static device nodes in /dev',
    '[ OK ] Starting Journal Service',
    '[ OK ] Starting Remount Root and Kernel File Systems',
    '[ OK ] Mounting /tmp',
    '[ OK ] Mounting /var/tmp',
    '[ OK ] Starting Load/Save Random Seed',
    '[ OK ] Starting Create System Users',
    '[ OK ] Starting Flush Journal to Persistent Storage',
    '[ OK ] Starting Create Volatile Files and Directories',
    '[ OK ] Starting Update UTMP about System Boot/Shutdown',
    '[ OK ] Starting Network Service',
    '[ OK ] Starting Network Name Resolution',
    '[ OK ] Starting D-Bus System Message Bus',
    '[ OK ] Starting Authorization Manager',
    '[ OK ] Starting Accounts Service',
    '[ OK ] Starting Hostname Service',
    '[ OK ] Starting Login Service',
    '[ OK ] Starting System Logging Service',
    '[ OK ] Starting User Manager for UID 1000',
    '[ OK ] Starting GNOME Display Manager',
    '[ OK ] Starting Bluetooth service',
    '[ OK ] Starting CUPS Scheduler',
    '[ OK ] Starting Avahi mDNS/DNS-SD Stack',
    '[ OK ] Starting Disk Manager',
    '[ OK ] Starting Update Manager',
    '[ OK ] Starting Clipboard Manager',
    '[ OK ] Starting Audio Service',
    '[ OK ] Starting Power Management',
    '[ OK ] Starting Print Spooler',
    '[ OK ] Starting SSH Daemon',
    '[ OK ] Starting Network Time Synchronization',
    '[ OK ] Starting File System Check on /home',
    '[ OK ] Starting File System Check on /var',
    '[ OK ] Starting Thermal Daemon',
    '[ OK ] Starting CPU frequency scaling governor',
    '[ OK ] Starting Graphics Driver',
    '[ OK ] Starting Input Device Manager',
    '[ OK ] Starting Backlight Manager',
    '[ OK ] Starting Battery Monitor',
    '[ OK ] Starting Network Manager',
    '[ OK ] Starting Firewall Service',
    '[ OK ] Starting VPN Service',
    '[ OK ] Starting Web Server',
    '[ OK ] Starting Database Service',
    '[ OK ] Starting Container Runtime',
    '[ OK ] Starting Package Manager',
    '[ OK ] Starting Update Notifier',
    '[ OK ] Starting Crash Reporter',
    '[ OK ] Starting Hardware Monitor',
    '[ OK ] Starting Temperature Monitor',
    '[ OK ] Starting Disk Health Monitor',
    '[ OK ] Starting Memory Test',
    '[ OK ] Starting Security Scanner',
    '[ ERROR ] Failed to start VirtualBox Guest Service.',
    '[ OK ] Starting Window Manager',
    '[ OK ] Starting Desktop Environment',
    '[ ERROR ] Failed to start Snap Daemon.',
    '[ OK ] Starting Icon Theme Cache',
    '[ OK ] Starting Font Cache',
    '[ OK ] Starting Notification Service',
    '[ OK ] Reached target Graphical Interface',
    '[ OK ] Started Portfolio Desktop Environment',
    '[ ERROR ] Failed to mount /mnt/backup: No such device',
    '[ ERROR ] Failed to connect to external monitor',
    '[ OK ] Finished booting. Welcome!'
];

const bootScreen = document.getElementById('boot-screen');
const bootLogs = document.getElementById('boot-logs');
let bootIndex = 0;

function colorizeBootLine(line) {
    return line
        .replace(/\[ OK \]/g, '<span class="ok">[ OK ]</span>')
        .replace(/\[ ERROR \]/g, '<span class="error">[ ERROR ]</span>');
}

function showNextBootLine() {
    if (bootIndex < bootLines.length) {
        const div = document.createElement('div');
        div.innerHTML = colorizeBootLine(bootLines[bootIndex]);
        bootLogs.appendChild(div);
        bootIndex++;
        // Scroll to bottom as logs appear
        bootLogs.scrollTop = bootLogs.scrollHeight;
        setTimeout(showNextBootLine, 18 + Math.random() * 12); // Even faster speed
    } else {
        setTimeout(() => {
            startGlitchTransition();
        }, 400);
    }
}

// Hide desktop until boot is done
document.querySelector('.desktop').style.visibility = 'hidden';
document.querySelector('.desktop').style.opacity = 0;

window.addEventListener('DOMContentLoaded', () => {
    showNextBootLine();
});

function startGlitchTransition() {
    // Add glitch effect to boot screen
    bootLogs.classList.add('glitch-boot');
    
    // Add scanline overlay
    const glitchOverlay = document.createElement('div');
    glitchOverlay.className = 'glitch-overlay';
    document.body.appendChild(glitchOverlay);
    
    // Prepare desktop
    document.querySelector('.desktop').style.visibility = '';
    document.querySelector('.desktop').style.opacity = 0;
    
    // Quick flicker sequence
    let flickerCount = 0;
    const flickerInterval = setInterval(() => {
        bootScreen.style.opacity = flickerCount % 2 === 0 ? '0' : '1';
        
        if (Math.random() > 0.7) {
            bootScreen.style.transform = `translateX(${Math.random() * 3 - 1.5}px)`;
        }
        
        flickerCount++;
        
        if (flickerCount >= 5) { // Reduced from 12 to 4
            clearInterval(flickerInterval);
            
            // Instant final transition
            bootScreen.style.opacity = '0';
            bootScreen.style.transform = 'translateX(0)';
            bootScreen.style.display = 'none';
            
            // Show desktop immediately with glitch effect
            document.querySelector('.desktop').classList.add('glitch-desktop');
            document.querySelector('.desktop').style.transition = 'opacity 0.05s ease-out'; // Reduced from 0.3s
            document.querySelector('.desktop').style.opacity = 1;
            
            // Quick cleanup
            setTimeout(() => {
                document.querySelector('.desktop').classList.remove('glitch-desktop');
                document.body.removeChild(glitchOverlay);
            }, 200); // Reduced from 800ms
        }
    }, 30); // Reduced from 30ms to 15ms for faster flicker
}

        // Update time
        function updateTime() {
            const now = new Date();
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            const dayName = days[now.getDay()];
            const day = now.getDate();
            const month = months[now.getMonth()];
            
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            
            const timeString = `${dayName} ${day} ${month} ${hours}<span class="time-colon">:</span>${minutes} ${ampm}`;
            document.getElementById('time').innerHTML = timeString;
        }
        updateTime();
        setInterval(updateTime, 1000);

        // Window management
        let activeWindow = null;
        let draggedWindow = null;
        let dragOffset = { x: 0, y: 0 };
        let resizingWindow = null;
        let resizeStart = { x: 0, y: 0, width: 0, height: 0 };

        function openWindow(windowId) {
            // Close other windows
            document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('active');
            });
            
            // Open selected window
            const window = document.getElementById(windowId);
            window.classList.add('active');
            activeWindow = windowId;
            
            // Update dock indicators
            document.querySelectorAll('.dock-item').forEach(item => {
        item.classList.remove('active');
    });
    const icon = document.querySelector(`[data-window="${windowId}"]`);
    if (icon) icon.classList.add('active');
        }

        function closeWindow(windowId) {
    document.getElementById(windowId).classList.remove('active');
    const icon = document.querySelector(`[data-window="${windowId}"]`);
    if (icon) icon.classList.remove('active');
    if (activeWindow === windowId) {
        activeWindow = null;
    }
        }

        // Desktop icon clicks
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const windowId = icon.getAttribute('data-window');
                openWindow(windowId);
            });
        });

        // Dock item clicks
        document.querySelectorAll('.dock-item').forEach(item => {
            item.addEventListener('click', () => {
                const windowId = item.getAttribute('data-window');
                if (windowId) {
                    openWindow(windowId);
                }
            });
        });


// Window dragging
document.querySelectorAll('.window-header').forEach(header => {
    header.addEventListener('mousedown', (e) => {
    e.preventDefault();
    draggedWindow = header.parentElement;
    
    const rect = draggedWindow.getBoundingClientRect();
    dragOffset.x = e.clientX;
    dragOffset.y = e.clientY;
    
    const matrix = window.getComputedStyle(draggedWindow).transform;
    if (matrix !== 'none') {
        const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
        initialPos.x = parseFloat(values[4]);
        initialPos.y = parseFloat(values[5]);
    } else {
        initialPos.x = 0;
        initialPos.y = 0;
    }

    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', dragWindow);
    document.addEventListener('mouseup', stopDragging);
});
});


let initialPos = { x: 0, y: 0 };

function dragWindow(e) {
    if (draggedWindow) {
        const dx = e.clientX - dragOffset.x;
        const dy = e.clientY - dragOffset.y;

        const translateX = initialPos.x + dx;
        const translateY = initialPos.y + dy;

        draggedWindow.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
}

function stopDragging() {
    draggedWindow = null;
    document.body.style.userSelect = ''; // Restore text selection
    document.removeEventListener('mousemove', dragWindow);
    document.removeEventListener('mouseup', stopDragging);
        }

        // Window resizing
        document.querySelectorAll('.window').forEach(win => {
            // Add resize handle if not present
            if (!win.querySelector('.window-resize-handle')) {
                const handle = document.createElement('div');
                handle.className = 'window-resize-handle window-resize-se';
                win.appendChild(handle);
            }
            // Resize logic
            const handle = win.querySelector('.window-resize-handle');
            handle.addEventListener('mousedown', function(e) {
                e.stopPropagation();
                resizingWindow = win;
                resizeStart.x = e.clientX;
                resizeStart.y = e.clientY;
                resizeStart.width = resizingWindow.offsetWidth;
                resizeStart.height = resizingWindow.offsetHeight;
                document.body.style.userSelect = 'none';
                e.stopPropagation();
                document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
                icon.classList.add('selected');
            });
        });

        // Prevent context menu on desktop
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // --- Theme and Wallpaper Functionality ---

        // Set dark mode by default
        document.body.classList.add('dark-mode');
document.getElementById('theme-toggle').checked = true;
document.getElementById('theme-label').textContent = 'Dark Mode';

function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.getElementById('theme-label').textContent = 'Dark Mode';
        document.getElementById('theme-toggle').checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        document.getElementById('theme_label').textContent = 'Light Mode';
        document.getElementById('theme-toggle').checked = false;
    }
    updateIconsForTheme();
    updateMenuBarForTheme();
}

// Toggle switch event
document.getElementById('theme-toggle').addEventListener('change', function() {
    setTheme(this.checked);
});

// Ensure theme applies on load
setTheme(true);


        // Wallpaper switching
        document.querySelectorAll('.wallpaper-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
        const newWallpaper = thumb.dataset.wallpaper;
        const overlay = document.getElementById('wallpaper-overlay');
        const desktop = document.querySelector('.desktop');

        // Set up overlay with new image and fade in
        overlay.style.backgroundImage = `url('${newWallpaper}')`;
        overlay.style.opacity = '1';

        // After fade duration, update desktop and fade out overlay
        setTimeout(() => {
            desktop.style.backgroundImage = `url('${newWallpaper}')`;
            overlay.style.opacity = '0';
        }, 600); // Match CSS transition duration

        // Handle selected class
        document.querySelectorAll('.wallpaper-thumb').forEach(t => t.classList.remove('selected'));
        thumb.classList.add('selected');
    });
});

        // Set default wallpaper selected
        document.querySelector('.wallpaper-thumb[data-wallpaper="gotharch.jpg"]').classList.add('selected');

        // Update icons and menu bar for theme
        function updateIconsForTheme() {
            const isDark = document.body.classList.contains('dark-mode');
            // Desktop and dock icons
            document.querySelectorAll('.icon-image, .dock-item').forEach(icon => {
                if (isDark) {
                    icon.classList.add('mono');
                    icon.classList.remove('color');
                } else {
                    icon.classList.remove('mono');
                    icon.classList.add('color');
                }
            });
            // SVG paths
            document.querySelectorAll('.icon-image svg, .dock-item svg').forEach(svg => {
        svg.style.filter = '';
        svg.style.fill = '';
            });
        }
        function updateMenuBarForTheme() {
            const isDark = document.body.classList.contains('dark-mode');
            const menuBar = document.querySelector('.menu-bar');
            if (isDark) {
                menuBar.style.background = '#000';
                menuBar.style.color = '#fff';
                menuBar.querySelectorAll('.menu-icon, .apple-logo').forEach(icon => {
                    icon.style.filter = 'invert(0)';
                });
            } else {
                menuBar.style.background = '#fff';
                menuBar.style.color = '#222';
                menuBar.querySelectorAll('.menu-icon, .apple-logo').forEach(icon => {
                    icon.style.filter = 'invert(1)';
                });
            }
        }
        updateIconsForTheme();
        updateMenuBarForTheme();

        // File system structure
const explorerData = {
    home: [
        { type: 'folder', name: 'Documents' },
        { type: 'folder', name: 'Downloads' },
        { type: 'folder', name: 'Pictures' },
        { type: 'folder', name: 'Music' },
        { type: 'folder', name: 'Videos' },
        { type: 'file', name: 'Readme.txt' }
    ],
    documents: [
        { type: 'file', name: 'Resume.pdf' },
        { type: 'file', name: 'Project.docx' }
    ],
    downloads: [
        { type: 'file', name: 'Invoice.pdf' },
        { type: 'file', name: 'Photo.zip' }
    ],
    pictures: [
        { type: 'file', name: 'gotharch.jpg' },
        { type: 'file', name: 'wallpaper2.jpg' },
        { type: 'file', name: 'wallpaper3.jpg' }
    ],
    music: [
        { type: 'file', name: 'Song.mp3' }
    ],
    videos: [
        { type: 'file', name: 'Demo.mp4' }
    ]
};

function renderExplorer(folder = 'home') {
    // Highlight sidebar
    document.querySelectorAll('.explorer-sidebar-item').forEach(item => {
        item.classList.toggle('selected', item.dataset.folder === folder);
    });
    // Render main area
    const main = document.getElementById('explorer-main');
    main.innerHTML = '';
    explorerData[folder].forEach(item => {
        if (item.type === 'folder') {
            main.innerHTML += `
                <div class="explorer-folder" data-folder="${item.name.toLowerCase()}">
                    <div class="explorer-folder-icon">
                        <svg viewBox="0 0 24 24"><path d="M10 4H2v16h20V6H12l-2-2z"/></svg>
                    </div>
                    <div class="explorer-folder-label">${item.name}</div>
                </div>
            `;
        } else if (folder === 'documents' && item.name === 'Resume.pdf') {
            main.innerHTML += `
                <div class="explorer-file open-resume">
                    <div class="explorer-file-icon">
                        <svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/></svg>
                    </div>
                    <div class="explorer-file-label">Resume.pdf</div>
                </div>
            `;
        } else if (folder === 'documents' && item.name === 'Project.docx') {
            main.innerHTML += `
                <div class="explorer-file open-projects">
                    <div class="explorer-file-icon">
                        <svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/></svg>
                    </div>
                    <div class="explorer-file-label">Project.docx</div>
                </div>
            `;
        } else if (folder === 'pictures' && (item.name.endsWith('.jpg') || item.name.endsWith('.png'))) {
            main.innerHTML += `
                <div class="explorer-file">
                    <div class="explorer-file-icon" style="padding:0;">
                        <img src="${item.name}" alt="${item.name}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.10);">
                    </div>
                    <div class="explorer-file-label">${item.name}</div>
                </div>
            `;
        } else {
            main.innerHTML += `
                <div class="explorer-file">
                    <div class="explorer-file-icon">
                        <svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/></svg>
                    </div>
                    <div class="explorer-file-label">${item.name}</div>
                </div>
            `;
        }
    });
    // Folder click navigation
    main.querySelectorAll('.explorer-folder').forEach(folderEl => {
        folderEl.addEventListener('dblclick', () => {
            const folderName = folderEl.dataset.folder;
            if (explorerData[folderName]) {
                renderExplorer(folderName);
            }
        });
    });
    // Open Resume window
    main.querySelectorAll('.open-resume').forEach(fileEl => {
        fileEl.addEventListener('dblclick', () => {
            openWindow('resume');
        });
    });
    // Open Projects window
    main.querySelectorAll('.open-projects').forEach(fileEl => {
        fileEl.addEventListener('dblclick', () => {
            openWindow('projects');
        });
    });
}

// Sidebar navigation
document.querySelectorAll('.explorer-sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        renderExplorer(item.dataset.folder);
    });
});

// Open explorer with Home view
document.querySelectorAll('.desktop-icon[data-window="explorer"], .dock-item[data-window="explorer"]').forEach(icon => {
    icon.addEventListener('click', () => {
        renderExplorer('home');
    });
});

// Initial render if explorer is opened by default
if (document.getElementById('explorer').classList.contains('active')) {
    renderExplorer('home');
}

// Terminal functionality
const terminalInput = document.getElementById('terminal-input');
const terminalLines = document.getElementById('terminal-lines');
const terminalContent = document.getElementById('terminal-content');

const terminalCommands = {
    help: [
        'Available commands:',
        'help         - Show this help message',
        'ls           - List directory contents',
        'cd           - Change directory',
        'pwd          - Print working directory',
        'cat          - Show file content or open window',
        'echo         - Display a line of text',
        'date         - Show today\'s date',
        'time         - Show current time',
        'whoami       - Display user info',
        'skills       - List my skills',
        'experience   - Show experience',
        'education    - Show education',
        'achievements - Show achievements',
        'about        - About me',
        'projects     - List projects',
        'contact      - Contact info',
        'clear        - Clear the terminal'
    ],
    about: [
        "I'm Joy Khaneja, a passionate CyberSecurity enthusiast.",
        "Driven by curiosity, I thrive on continuous learning across diverse domains."
    ],
    projects: [
        "OSINTomains               - Domain OSINT automation tool",
        "AI-Driven NetSec Platform - Enterprise network security system",
        "CTF Development           - Custom infosec CTF challenges",
        "Portfolio Website         - macOS-style personal site",
        "Spectrogram-Encoder       - Image-to-audio converter",
        "MorseEmbed                - Audio Morse code marker",
        "rMQR CLI Generator        - Terminal rMQR generator",
        "Stock Price Prediction    - ML-based stock forecaster",
        "Exploit Utilities         - Wireless & USB attack demos"

    ],
    contact: [
        "Email: joy.khaneja@gmail.com",
        "LinkedIn: linkedin.com/in/joykhaneja",
        "GitHub: github.com/joykhaneja",
    ],
    skills: [
        "Technical:",
        "Java, Python, Bash, C/C++, HTML, CSS, MySQL, Prolog",
        "Softwares:",
        "Wireshark, Nmap, Autopsy, Volatility, BurpSuite, Metasploit, FTK Imager, Aircrack-ng, Ghidra, IDA Free, Squalr",
        "OS & Platforms:",
        "Linux, Windows, MacOS, Git/Github, Docker, Visual Studio, NeoVim, LaTex"
    ],
    experience: [
        "SecOps Intern, ACPL Systems (Jun 2025 - Present)",
        "Tech Intern, Wipro Ltd. (Jul 2024 - Sept 2024)",
        "DFIR Intern, Future Crime Research Foundation (Jun 2024 - Aug 2024)",
        "CyberSecurity Intern, Gurugram Cyber Police (Jun 2024 - Jul 2024)",
        "Intern, Delhi Police Special Cell - IFSO/NCFL (Jul 2023 - Sept 2023)",
    ],
    education: [
        "B.Tech in CSE with CyberSec & Threat Intel, Manav Rachna University, 2022-2026"
    ],
    achievements: [
        "• Cleared Certified Red Team Analyst (CRTA)",
        "• NPTEL Cloud Computing – Top 5% ranker",
        "• DFIR Internship – Top Performer (FCRF)",
        "• Active CTF participant – local & global",
        "• IEEE Delhi Section – Volunteer Awardee",
        "• IEEE MRU – Creative & Tech Excellence Award",
        "• Received Letters of Appreciation – IEEE MRU",
        "• Led MRU Cyber Squad as President",
        "• Chaired IEEE MRU Computer Society"
    ]
};

let terminalCwd = 'home';

function printToTerminal(lines, color, isHtml) {
    if (typeof lines === 'string') lines = [lines];
    lines.forEach(line => {
        const div = document.createElement('div');
        div.className = 'terminal-output';
        if (color) div.style.color = color;
        if (isHtml) {
            div.innerHTML = line;
        } else {
            div.textContent = line;
        }
        terminalLines.appendChild(div);
    });
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

function lsCommand() {
    if (!explorerData[terminalCwd]) {
        printToTerminal('', null, true);
        return;
    }
    let html = explorerData[terminalCwd].map(item =>
        item.type === 'folder'
            ? `<span style="color:#00afff">${item.name}/</span>`
            : item.name
    ).join('  ');
    printToTerminal(html, null, true);
}

function pwdCommand() {
    printToTerminal(`/` + (terminalCwd === 'home' ? '' : terminalCwd), "#ff0");
}

function cdCommand(arg) {
    if (!arg || arg === '~' || arg === '/home' || arg === '/') {
        terminalCwd = 'home';
    } else if (arg === '..') {
        if (terminalCwd !== 'home') terminalCwd = 'home';
    } else if (explorerData[arg]) {
        terminalCwd = arg;
    } else {
        printToTerminal(`cd: no such file or directory: ${arg}`, "#ff3b30");
    }
}

function catCommand(arg) {
    if (!arg) {
        printToTerminal('cat: missing file operand', "#ff3b30");
        return;
    }
    // Resume.pdf
    if (terminalCwd === 'documents' && arg.toLowerCase() === 'resume.pdf') {
        openWindow('resume');
        printToTerminal('Opening Resume window...', "#00afff");
        return;
    }
    // Project.docx
    if (terminalCwd === 'documents' && arg.toLowerCase() === 'project.docx') {
        openWindow('projects');
        printToTerminal('Opening Projects window...', "#00afff");
        return;
    }
    // Show text for Readme.txt
    if (terminalCwd === 'home' && arg.toLowerCase() === 'readme.txt') {
        printToTerminal('Welcome to Joy Khaneja\'s Portfolio!\nUse the terminal or File Explorer to explore.', "#00ff5f");
        return;
    }
    // Show image info for wallpapers
    if (terminalCwd === 'pictures' && (arg.endsWith('.jpg') || arg.endsWith('.png'))) {
        printToTerminal(`Image file: ${arg}`, "#00afff");
        return;
    }
    // Not found
    printToTerminal(`cat: ${arg}: No such file`, "#ff3b30");
}

function echoCommand(args) {
    printToTerminal(args.join(' '));
}

function dateCommand() {
    const now = new Date();
    printToTerminal(now.toDateString(), "#ff0");
}

function timeCommand() {
    const now = new Date();
    printToTerminal(now.toLocaleTimeString(), "#ff0");
}

function whoamiCommand() {
    printToTerminal("guest\nDon't try to escalate the privileges here", "#00ff5f");
}

function handleTerminalCommand(cmd) {
    const command = cmd.trim();
    if (!command) return;
    printToTerminal(`joy@portfolio:${terminalCwd === 'home' ? '~' : '/' + terminalCwd}$ ${cmd}`, "#00ff5f");
    const [base, ...args] = command.split(/\s+/);
    switch (base) {
        case 'help':
            printToTerminal(terminalCommands.help, "#ff0");
            break;
        case 'ls':
            lsCommand();
            break;
        case 'pwd':
            pwdCommand();
            break;
        case 'cd':
            cdCommand(args[0]);
            break;
        case 'cat':
            catCommand(args[0]);
            break;
        case 'echo':
            echoCommand(args);
            break;
        case 'date':
            dateCommand();
            break;
        case 'time':
            timeCommand();
            break;
        case 'whoami':
            whoamiCommand();
            break;
        case 'skills':
            printToTerminal(terminalCommands.skills, "#00afff");
            break;
        case 'experience':
            printToTerminal(terminalCommands.experience, "#00afff");
            break;
        case 'education':
            printToTerminal(terminalCommands.education, "#00afff");
            break;
        case 'achievements':
            printToTerminal(terminalCommands.achievements, "#00afff");
            break;
        case 'about':
            printToTerminal(terminalCommands.about, "#00afff");
            break;
        case 'projects':
            printToTerminal(terminalCommands.projects, "#00afff");
            break;
        case 'contact':
            printToTerminal(terminalCommands.contact, "#00afff");
            break;
        case 'clear':
            terminalLines.innerHTML = '';
            break;
        default:
            printToTerminal(`Command not found: ${cmd}`, "#ff3b30");
    }
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleTerminalCommand(terminalInput.value);
            terminalInput.value = '';
        }
    });
}

// Focus input when terminal opens
document.querySelectorAll('.desktop-icon[data-window="terminal"], .dock-item[data-window="terminal"]').forEach(icon => {
    icon.addEventListener('click', () => {
        setTimeout(() => {
            terminalInput && terminalInput.focus();
        }, 150);
    });
});
function toggleMaximizeWindow(btn) {
    const win = btn.closest('.window');
    if (!win) return;
    if (!win.classList.contains('maximized')) {
        // Save current size/position
        win.dataset.prevLeft = win.style.left;
        win.dataset.prevTop = win.style.top;
        win.dataset.prevWidth = win.style.width;
        win.dataset.prevHeight = win.style.height;
        // Maximize
        win.style.left = '0px';
        win.style.top = '24px';
        win.style.width = (window.innerWidth - 2) + 'px';
        win.style.height = (window.innerHeight - 32) + 'px';
        win.classList.add('maximized');
    } else {
        // Restore
        win.style.left = win.dataset.prevLeft || '100px';
        win.style.top = win.dataset.prevTop || '100px';
        win.style.width = win.dataset.prevWidth || '500px';
        win.style.height = win.dataset.prevHeight || '400px';
        win.classList.remove('maximized');
    }
}

// Apple menu dropdown logic
const appleLogo = document.querySelector('.apple-logo');
const appleMenu = document.getElementById('apple-menu');
let appleMenuOpen = false;

appleLogo.addEventListener('click', (e) => {
    e.stopPropagation();
    appleMenu.style.display = appleMenuOpen ? 'none' : 'block';
    appleMenuOpen = !appleMenuOpen;
});
document.addEventListener('click', (e) => {
    if (appleMenuOpen && !appleMenu.contains(e.target) && e.target !== appleLogo) {
        appleMenu.style.display = 'none';
        appleMenuOpen = false;
    }
});

// Theme switch in Apple menu
const appleThemeSwitch = document.getElementById('apple-theme-switch');
const appleThemeLabel = document.getElementById('apple-theme-label');
appleThemeSwitch.checked = document.body.classList.contains('dark-mode');
appleThemeLabel.textContent = document.body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode';

appleThemeSwitch.addEventListener('change', function() {
    setTheme(this.checked);
    appleThemeLabel.textContent = this.checked ? 'Dark Mode' : 'Light Mode';
});

// Keep Apple menu switch in sync with main switch
document.getElementById('theme-toggle').addEventListener('change', function() {
    appleThemeSwitch.checked = this.checked;
    appleThemeLabel.textContent = this.checked ? 'Dark Mode' : 'Light Mode';
});

// Open System Info from Apple menu
document.getElementById('apple-system-info').addEventListener('click', () => {
    openWindow('systeminfo');
    appleMenu.style.display = 'none';
    appleMenuOpen = false;
});

// System Info: random stats and graph
let sysinfoUptime = 0;
let sysinfoGraphData = Array(40).fill(0);

function randomRange(min, max, decimals=0) {
    const val = Math.random() * (max - min) + min;
    return decimals ? val.toFixed(decimals) : Math.round(val);
}
// Music player logic
const musicTracks = [
    {
        title: "Big Pop-Uh",
        file: "music/song1.mp3"
    },
    {
        title: "Interstellar",
        file: "music/song2.mp3"
    },
    {
        title: "Synthwave",
        file: "music/song3.mp3"
    }
];

let currentTrack = 0;
let isPlaying = false;

const audio = document.getElementById('music-audio');
const titleEl = document.getElementById('music-title');
const statusEl = document.getElementById('music-status');
const playPauseBtn = document.getElementById('music-playpause');
const prevBtn = document.getElementById('music-prev');
const nextBtn = document.getElementById('music-next');
const progressEl = document.getElementById('music-progress');

function loadTrack(idx) {
    const track = musicTracks[idx];
    audio.src = track.file;
    titleEl.textContent = track.title;
    statusEl.textContent = isPlaying ? "Playing" : "Paused";
    progressEl.value = 0;
    progressEl.max = 100;
}
function playTrack() {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸️";
    statusEl.textContent = "Playing";
}
function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶️";
    statusEl.textContent = "Paused";
}
function togglePlayPause() {
    if (audio.paused) playTrack();
    else pauseTrack();
}
function nextTrack() {
    currentTrack = (currentTrack + 1) % musicTracks.length;
    loadTrack(currentTrack);
    playTrack();
}
function prevTrack() {
    currentTrack = (currentTrack - 1 + musicTracks.length) % musicTracks.length;
    loadTrack(currentTrack);
    playTrack();
}
audio.addEventListener('ended', nextTrack);
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        progressEl.value = (audio.currentTime / audio.duration) * 100;
    }
});
progressEl.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progressEl.value / 100) * audio.duration;
    }
});
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

// Open Music Player from dock
document.querySelectorAll('.dock-item').forEach(item => {
    const tooltip = item.querySelector('.dock-tooltip');
    if (tooltip && tooltip.textContent.trim().toLowerCase() === 'music') {
        item.addEventListener('click', () => {
            openWindow('music');
            loadTrack(currentTrack);
        });
    }
});

function updateSystemInfo() {
    // Fake stats
    const cpu = randomRange(12, 85);
    const gpu = randomRange(5, 65);
    const ram = randomRange(3.2, 7.8, 1);
    const disk = randomRange(22, 88);
    const temp = randomRange(38, 77);
    sysinfoUptime += 2;

    document.getElementById('sysinfo-cpu').textContent = cpu + '%';
    document.getElementById('sysinfo-gpu').textContent = gpu + '%';
    document.getElementById('sysinfo-ram').textContent = ram + ' GB';
    document.getElementById('sysinfo-disk').textContent = disk + '%';
    document.getElementById('sysinfo-temp').textContent = temp + '°C';
    // Uptime
    let up = sysinfoUptime;
    const hrs = Math.floor(up/3600);
    const mins = Math.floor((up%3600)/60);
    const secs = up%60;
    document.getElementById('sysinfo-uptime').textContent = `${hrs}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;

    // Graph (CPU usage)
    sysinfoGraphData.push(cpu);
    if (sysinfoGraphData.length > 40) sysinfoGraphData.shift();
    drawSysinfoGraph();
}
function drawSysinfoGraph() {
    const canvas = document.getElementById('sysinfo-graph');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for(let i=0;i<=4;i++) {
        ctx.beginPath();
        ctx.moveTo(0, i*25);
        ctx.lineTo(canvas.width, i*25);
        ctx.stroke();
    }
    // Draw line
    ctx.strokeStyle = '#00afff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    sysinfoGraphData.forEach((val, i) => {
        const x = i * (canvas.width/(sysinfoGraphData.length-1));
        const y = canvas.height - (val/100)*canvas.height;
        if(i===0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);
    });
    ctx.stroke();
}
setInterval(updateSystemInfo, 2000);
updateSystemInfo();
    
