



        function canva(){
	let container = document.getElementById('container');
	var canvas=document.getElementById('canvas'),
	 ctx = canvas.getContext('2d'),
	w = canvas.width = innerWidth,
	h = canvas.height = container.scrollHeight,

	particles = [],
	properties = {
		bgColor: 'rgba(17,17,19,1)',
		particleColor:'rgba(255,40,40,1)',
		particleRadius:5,		//радиус объектов
		particleCount:100 ,// колличество объектов
		particleMaxVelocity: 0.8, //скорость
		lineLength: 100,
		particlesLife: 6
	};
	document.querySelector('body').appendChild(canvas);

// реакция на событие изм. view

	window.onresize = function(){
		w = canvas.width = innerWidth,
		h = canvas.height = container.scrollHeight;
	}

	// создаем конструктор со своими методами!
	class Particle{
		constructor(){
			this.x = Math.random()*w;
			this.y = Math.random()*h;
			this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
			this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
			this.life = Math.random()*properties.particlesLife*60;
		}
		position(){
			this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX *= -1 : this.velocityX;// чтобы частицы не уходили за экран
			this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY *= -1 : this.velocityY;
			this.x += this.velocityX;
			this.y += this.velocityY
		}

		reDraw(){
			ctx.beginPath() // начало контура
			ctx.arc(this.x, this.y ,properties.particleRadius, 0 ,Math.PI*2,true);//рисуем окружность с радиусом 3
			ctx.closePath();// добавляет в путь линию от текущей до первоначальной точки,инициализирует объект
			ctx.fillStyle = properties.particleColor;
			ctx.fill();
		}
		reCalculateLife(){
			if (this.life<1){
			this.x = Math.random()*w;
			this.y = Math.random()*h;
			this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
			this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
			this.life = Math.random()*properties.particlesLife*60;
			}
			this.life--;
		}

	}

// заливаем background канваса 

	function reDrawBackground(){
		ctx.fillStyle = properties.bgColor;
		ctx.fillRect(0,0,w,h);
	}

	function drawLines(){
		let x1,y1,x2,y2,length,opacity;
		for(var i in particles){
			for(var j in particles){
				x1 = particles[i].x;
				y1 = particles[i].y;
				x2 = particles[j].x;
				y2 = particles[j].y;
				length = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1, 2));// Math.pow(7,2)=>49,вычисляем длину линии по диагонали
				if(length < properties.lineLength){
					opacity = 1-length/properties.lineLength;
					ctx.lineWidth = '0.5';
					ctx.strokeStyle = 'rgba(255,40,40,'+opacity+')';
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.closePath();
					ctx.stroke();
				}
			}
		}
	}


// рисуем контуры для каэдого объукта
	function reDrawParticles(){
		for(var i in particles){
			particles[i].reCalculateLife();
			particles[i].position();
			particles[i].reDraw();
		}
	}

//loop - переводится как петля
	function loop(){
		reDrawBackground();
		reDrawParticles();
		drawLines();
		requestAnimationFrame(loop);
	};

	function init(){
		for(var i=0; i < properties.particleCount;i++){
			particles.push(new Particle);
		}
		loop();
	}
init();



};
canva();
//window.onload('onload',canva());