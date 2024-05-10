//valores y constantes
let timerA, timerB, PauseReplayBool=true,
	PlusHoras = document.getElementById("PlusHoras"),
	PlusMinutos = document.getElementById("PlusMinutos"),
	PlusSegundos = document.getElementById("PlusSegundos"),
	Circulo = document.getElementById("Circulo"),
	CuentaRegresiva = document.getElementById("CuentaRegresiva"),
	PausaReplay = document.getElementById("PausaReplay"),
	horasRestantes, minutosRestantes, segundosRestantes;
;

    //DOM
	function CambiosS() {
		if(PlusSegundos.value >= 60){
			PlusMinutos.value = parseInt(PlusMinutos.value, 10) + 1;
			PlusSegundos.value = parseInt(PlusSegundos.value, 10) - 60;
		}
		if(PlusSegundos.value >= 60){CambiosS();}
	}
	function CambiosM() {
		if(PlusMinutos.value >= 60){
			PlusHoras.value = parseInt(PlusHoras.value, 10) + 1;
			PlusMinutos.value = parseInt(PlusMinutos.value, 10) - 60;
		}
		if(PlusMinutos.value >= 60){CambiosM();}
	}
	
	/* Poner 0 cuando se quede vacio */
	function EnCero(Elemento){
		if(Elemento.value == ""){Elemento.value = 0;}
	}
	
	function PauseReplay() {
		/* Si se esta parado */
		console.log(PauseReplayBool);
		if(PauseReplayBool){Comenzar();}
		else{
			timerA.finish();
			clearTimeout(timerB);
			PlusHoras.value = horasRestantes;
			PlusMinutos.value = minutosRestantes;
			PlusSegundos.value = segundosRestantes;
			document.title = "Temporizador";
			PausaReplay.innerHTML = `<path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"/>`;
			PauseReplayBool=true;
		}
	}

	function Comenzar() {
		// Cambios de diseño del botón
		PauseReplayBool=false;
		PausaReplay.innerHTML = `
			<rect x="-2" y="-1" width="7" height="20"/>
			<rect x="9" y="-1" width="7" height="20"/>`;

		// Limpiar cualquier temporizador previo
		if(timerA!=null){timerA.finish();}
		if(timerB!==null){clearTimeout(timerB);}

		// Obtener la hora actual
		let horaActual = new Date();
		
		// Obtener la hora deseada
		let horaDeseada = new Date();
		horaDeseada.setHours(horaDeseada.getHours() + parseInt(PlusHoras.value, 10));
		horaDeseada.setMinutes(horaDeseada.getMinutes() + parseInt(PlusMinutos.value, 10));
		horaDeseada.setSeconds(horaDeseada.getSeconds() + parseInt(PlusSegundos.value, 10));

		// Calcular la diferencia entre la hora deseada y la hora actual
		let tiempoRestante = horaDeseada - horaActual;

		// Calcular las horas, minutos y segundos de diferencia
		horasRestantes = Math.floor(tiempoRestante / (60 * 60 * 1000));
		minutosRestantes = Math.floor((tiempoRestante % (60 * 60 * 1000)) / (60 * 1000));
		segundosRestantes = Math.floor((tiempoRestante % (60 * 1000)) / 1000);

		// Añadir cero delante si es necesario
		let horasFormateadas = (horasRestantes < 10) ? "0" + horasRestantes : horasRestantes;
		let minutosFormateados = (minutosRestantes < 10) ? "0" + minutosRestantes : minutosRestantes;
		let segundosFormateados = (segundosRestantes < 10) ? "0" + segundosRestantes : segundosRestantes;

		// Utilizar esta diferencia como la duración total para el temporizador
		timerA=Circulo.animate([
			{strokeDasharray: "100, 100"},
			{strokeDasharray: "0, 100"}],
			{duration: tiempoRestante-500});

		// Mostrar en el temporizador y título
		CuentaRegresiva.innerHTML = horasFormateadas+" : "+minutosFormateados+" : "+segundosFormateados;
		document.title = "Temporizador "+horasFormateadas+":"+minutosFormateados+":"+segundosFormateados;
		
		// Bucle que va restando el tiempo
		timerB=setInterval(function(){
		
			// Calcular las horas, minutos y segundos de diferencia
			horasRestantes = Math.floor(tiempoRestante / (60 * 60 * 1000));
			minutosRestantes = Math.floor((tiempoRestante % (60 * 60 * 1000)) / (60 * 1000));
			segundosRestantes = Math.floor((tiempoRestante % (60 * 1000)) / 1000);

			// Añadir cero delante si es necesario
			horasFormateadas = (horasRestantes < 10) ? "0" + horasRestantes : horasRestantes;
			minutosFormateados = (minutosRestantes < 10) ? "0" + minutosRestantes : minutosRestantes;
			segundosFormateados = (segundosRestantes < 10) ? "0" + segundosRestantes : segundosRestantes;

			// Obtener la hora actual
			horaActual = new Date();
			
			// Calcular la diferencia entre la hora deseada y la hora actual
			tiempoRestante = horaDeseada - horaActual;

			// Terminar el bucle si el tiempo llega a cero
			if(horasRestantes<0 && minutosRestantes<0 && segundosRestantes<0){
				finish.playclip();
				clearTimeout(timerB);
				// Cambios de diseño del botón al finalizar
				PausaReplay.innerHTML = `<path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"/>`;
				PauseReplayBool=true;
				
			}
		
			// Actualizar el temporizador y título si el tiempo es mayor o igual a cero
			if(tiempoRestante>=0) {
				CuentaRegresiva.innerHTML = horasFormateadas+" : "+minutosFormateados+" : "+segundosFormateados;
				document.title = "Temporizador "+horasFormateadas+":"+minutosFormateados+":"+segundosFormateados;
			} else {document.title = "Temporizador";}
		},500);

		if(segundosRestantes==0){
			console.log("Fin")
		}
	}

	
	

	
	
	

