console.log(gsap)
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.getElementById('scoreEl')
const startGameBtn = document.getElementById('startGameBtn')
const modalEl = document.getElementById('modalEl')
const bigScoreEl = document.getElementById('bigScoreEl')

class Player {
    constructor(x,y,radius,color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    
    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
    }
}

class Projectile {
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Enemy {
    constructor(x,y,radius,color,velocity,char){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.char = char
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
        c.font = `${this.radius}px Arial`;
        c.fillStyle = "white";
        c.textAlign = "center";
        c.fillText(this.char, this.x, this.y+(10*this.radius/30));
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

const friction = 0.99

class Particle {
    constructor(x,y,radius,color,velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1.0
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.alpha -= 0.01
    }
}

function spawnEnemies(){
    setInterval(()=>{
        const radius = (Math.random()*(40-10))+10
        let x
        let y
        if(Math.random() < 0.5)
        {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height

        } else{
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
            x = Math.random() * canvas.width
        }
        const color = `hsl(${Math.random()*360}, 50%, 50%)`
        const angle = Math.atan2(canvas.height/2-y, canvas.width/2-x)
        const velocity = { x:Math.cos(angle), y:Math.sin(angle) } 
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
        enemies.push(new Enemy(x,y,radius,color,velocity,randomCharacter))
    }, 2000)
}

const x = canvas.width /2;
const y = canvas.height /2;
let player = new Player(x,y,20,'white')
let projectiles = []
let enemies = []
let particles = []

function init() {
    player = new Player(x,y,20,'white')
    projectiles = []
    enemies = []
    particles = []
    score = 0
    scoreEl.innerHTML = score
    bigScoreEl.innerHTML = score
}


let animationId
let score = 0
function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0 , 0, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach((projectile,index) => {
        projectile.update()
        // To remove out of bounds projectiles
        if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height)
        {
            projectiles.splice(index,1)
        }
    })
    enemies.forEach((enemy,index)=> {
        enemy.update()
        const dist = Math.hypot(player.x-enemy.x, player.y-enemy.y)
        if(dist-enemy.radius-player.radius < 1)
            {
                cancelAnimationFrame(animationId)
                modalEl.style.display = 'flex'
                bigScoreEl.innerHTML = score
                $.post('/game/shootGame', { score: score });
            }
        projectiles.forEach((projectile, projectileIndex)=> {
            const dist = Math.hypot(projectile.x-enemy.x, projectile.y-enemy.y)
            // when projectiles touch enemies
            if(dist-enemy.radius-projectile.radius < 1)
            {

                //create explosions
                for(let i=0; i<(Math.random()*enemy.radius)*4; i++)
                {
                    particles.push(new Particle(projectile.x,projectile.y,Math.random()*4,enemy.color, {x: (Math.random()-0.5)*6, y: (Math.random()-0.5)*6}))
                }
                if(enemy.radius > 20)
                {
                    score +=100
                    scoreEl.innerHTML = score
                    gsap.to(enemy, {radius: enemy.radius-12})
                    setTimeout(()=> {
                        projectiles.splice(projectileIndex,1)
                    },0)
                }
                else {
                    score +=250
                    scoreEl.innerHTML = score
                    setTimeout(()=> {
                        enemies.splice(index,1)
                        projectiles.splice(projectileIndex,1)
                    },0)
                }                
            }
        })
    })

    particles.forEach((particle,index)=> {
        if(particle.alpha <=0){
            particles.splice(index,1)
        }
        else {
        particle.update()
        }

    })
}

addEventListener('keydown', (event)=> {

    enemies.every((enemy)=> {
        if(event.key == enemy.char){
            const angle = Math.atan2(enemy.y - canvas.height/2, enemy.x - canvas.width/2)
            const velocity = { x:Math.cos(angle)*5, y:Math.sin(angle)*5 }
            projectiles.push(new Projectile(canvas.width/2, canvas.height/2, 5, 'white', velocity))
            return false
        }
        else{
            return true
        }
    })
})

startGameBtn.addEventListener('click', ()=> {
    init()
    animate()
    spawnEnemies()
    modalEl.style.display = 'none'
})

