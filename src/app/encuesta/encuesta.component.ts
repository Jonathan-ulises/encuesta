import { Component, OnInit } from '@angular/core';
import { Estado } from '../model/estado.interface';
import { EstadosMunicipiosService } from '../services/estados-municipios.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Choice } from '../model/choice.interface';
import { ValidateChecks, ValidateUrl } from '../validators/check.validator';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RespuestasService } from '../services/respuestas.service';

// const validateCheck = (arr: FormArray) => {
//   return arr.controls.some(x => x.value == false) ? {invalidCheck: true} : null;
// };
@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  lstEstados: Estado[] = [];
  lstMunicipios: string[] = [];
  selectedPreg_13Names: string[] = [];

  // LISTAS DE VALORES PARA GENERAR CHECKS
  preg_12Choices: Choice[] = [
    {
      name: "Via correo electrónico",
      value: "Via correo electrónico"
    },
    {
      name: "Plataformas como classroom, teams, etc",
      value: "Plataformas como classroom, teams, etc"
    },
    {
      name: "Grupos de WhatsApp",
      value: "Grupos de WhatsApp"
    },
    {
      name: "Ninguno",
      value: "Ninguno"
    }
  ]

  preg_14_15_16Choice: Choice[] = [
    {
      name: "Examen oral",
      value: "Examen oral"
    },
    {
      name: "Examen en línea",
      value: "Examen en línea"
    },
    {
      name: "Prueba escrita abierta",
      value: "Prueba escrita abierta"
    },
    {
      name: "Elaboración de trabajos, proyectos, casos",
      value: "Elaboración de trabajos, proyectos, casos"
    }
  ]

  preg_17Choice: Choice[] = [
    {
      name: "Problemas de conexión",
      value: "Problemas de conexión"
    },
    {
      name: "Dificultad para preguntar dudas durante el examen",
      value: "Dificultad para preguntar dudas durante el examen"
    },
    {
      name: "Nervios adicionales por la incertidumbre ante la evaluación online",
      value: "Nervios adicionales por la incertidumbre ante la evaluación online"
    },
    {
      name: "Excesiva carga de trabajo",
      value: "Excesiva carga de trabajo"
    },
    {
      name: "Exámenes escritos a resolver en tiempo reducido",
      value: "Exámenes escritos a resolver en tiempo reducido"
    },
    {
      name: "Coincidencia de entregar de trabajos de distintas asignaturas",
      value: "Coincidencia de entregar de trabajos de distintas asignaturas"
    }
  ]

  preg_27Choice: Choice[] = [
    {
      name: "Estudio",
      value: "Estudio"
    },
    {
      name: "Trabajo",
      value: "Trabajo"
    },
    {
      name: "Apoyo en casa",
      value: "Apoyo en casa"
    },
    {
      name: "Cuidado de menores/mayores",
      value: "Cuidado de menores/mayores"
    },
    {
      name: "Otros",
      value: "Otros"
    }
  ]



  encuestaForm = new FormGroup({
    preg_1_1: new FormControl(null, [Validators.required]),
    preg_1_2: new FormControl({ value: '', disabled: true }, [Validators.required]),
    preg_2: new FormControl(null, [Validators.required]),
    preg_3: new FormControl(null, [Validators.required]),
    preg_4: new FormControl(null, [Validators.required]),
    preg_5: new FormControl(null, [Validators.required]),
    preg_6: new FormControl(null, [Validators.required]),
    preg_7: new FormControl(null, [Validators.required]),
    preg_8: new FormControl(null, [Validators.required]),
    preg_9: new FormControl(null, [Validators.required]),
    preg_10: new FormControl(null, [Validators.required]),
    preg_11: new FormControl(null, [Validators.required]),
    preg_12: new FormArray([], [Validators.required, ValidateChecks]),
    preg_13: new FormControl(null, [Validators.required]),
    preg_14: new FormArray([], [Validators.required, ValidateChecks]),
    preg_15: new FormArray([], [Validators.required, ValidateChecks]),
    preg_16: new FormArray([], [Validators.required, ValidateChecks]),
    preg_17: new FormArray([], [Validators.required, ValidateChecks]),
    preg_18: new FormControl(null, [Validators.required]),
    preg_19: new FormControl(null, [Validators.required]),
    preg_20: new FormControl(null, [Validators.required]),
    preg_21: new FormControl(null, [Validators.required]),
    preg_22: new FormControl(null, [Validators.required]),
    preg_23: new FormControl(null, [Validators.required]),
    preg_24: new FormControl(null, [Validators.required]),
    preg_25: new FormControl(null, [Validators.required]),
    preg_26: new FormControl(null, [Validators.required]),
    preg_27: new FormArray([], [Validators.required, ValidateChecks]),
    preg_27_OTRO: new FormControl({value: null, disabled: true}, [Validators.required]),
    preg_28: new FormControl(null, [Validators.required]),
    preg_29: new FormControl(null)
  })

  showOtroControl: boolean = false;

  constructor(
    private estadoMunicipioService: EstadosMunicipiosService,
    private router: Router,
    private respuestasService: RespuestasService
  ) {
    this.addCheckBoxToForm(this.preg_12Choices, this.preg_12FormArray);
    this.addCheckBoxToForm(this.preg_14_15_16Choice, this.preg_14FormArray);
    this.addCheckBoxToForm(this.preg_14_15_16Choice, this.preg_15FormArray);
    this.addCheckBoxToForm(this.preg_14_15_16Choice, this.preg_16FormArray);
    this.addCheckBoxToForm(this.preg_17Choice, this.preg_17FormArray);
    this.addCheckBoxToForm(this.preg_27Choice, this.preg_27FormArray);

  }

  ngOnInit(): void {
    this.lstEstados = this.estadoMunicipioService.getEstados();
  }

  get preg_12FormArray() {
    return this.encuestaForm.controls.preg_12 as unknown as FormArray;
  }

  get preg_14FormArray() {
    return this.encuestaForm.controls.preg_14 as unknown as FormArray;
  }

  get preg_15FormArray() {
    return this.encuestaForm.controls.preg_15 as unknown as FormArray;
  }

  get preg_16FormArray() {
    return this.encuestaForm.controls.preg_16 as unknown as FormArray;
  }

  get preg_17FormArray() {
    return this.encuestaForm.controls.preg_17 as unknown as FormArray;
  }

  get preg_27FormArray() {
    return this.encuestaForm.controls.preg_27 as unknown as FormArray;
  }

  addCheckBoxToForm(listChoice: Choice[], pregFormArray: FormArray): void {
    listChoice.forEach(() => pregFormArray.push(new FormControl(false)))
  }

  cargarMunicipios(event: any): void {
    this.lstMunicipios = this.estadoMunicipioService.getMunicipioByEstado(this.encuestaForm.get('preg_1_1')!.value!);
    this.encuestaForm.controls['preg_1_2']?.enable();
  }



  enviarRespuestas(): void {
    console.log('FORM => ', this.encuestaForm.valid)
    if (this.validarFormulario()) {
      const selectedPreg12 = this.encuestaForm.value.preg_12?.map((checked, i) => checked ? this.preg_12Choices[i].value : null).filter(v => v !== null);
      const selectedPreg14 = this.encuestaForm.value.preg_14?.map((checked, i) => checked ? this.preg_14_15_16Choice[i].value : null).filter(v => v !== null);
      const selectedPreg15 = this.encuestaForm.value.preg_15?.map((checked, i) => checked ? this.preg_14_15_16Choice[i].value : null).filter(v => v !== null);
      const selectedPreg16 = this.encuestaForm.value.preg_16?.map((checked, i) => checked ? this.preg_14_15_16Choice[i].value : null).filter(v => v !== null);
      const selectedPreg17 = this.encuestaForm.value.preg_17?.map((checked, i) => checked ? this.preg_17Choice[i].value : null).filter(v => v !== null);
      const selectedPreg27 = this.encuestaForm.value.preg_27?.map((checked, i) => checked ? this.preg_27Choice[i].value : null).filter(v => v !== null);

      if (this.encuestaForm.controls.preg_27_OTRO.enabled) {
        selectedPreg27?.push(this.encuestaForm.controls.preg_27_OTRO.value)
      }

      let idx = selectedPreg27?.findIndex(x => x == "Otros")
      if (idx != -1) {
        selectedPreg27?.splice(idx as number,1)
      }

      const body = {
        "respuestas": {
          "1": this.encuestaForm.controls.preg_1_1.value,
          "2": this.encuestaForm.controls.preg_1_2.value,
          "3": this.encuestaForm.controls.preg_2.value,
          "4": this.encuestaForm.controls.preg_3.value,
          "5": this.encuestaForm.controls.preg_4.value,
          "6": this.encuestaForm.controls.preg_6.value,
          "7": this.encuestaForm.controls.preg_7.value,
          "8": this.encuestaForm.controls.preg_8.value,
          "9": this.encuestaForm.controls.preg_9.value,
          "10": this.encuestaForm.controls.preg_10.value,
          "11": this.encuestaForm.controls.preg_11.value,
          "12": selectedPreg12,
          "13": this.encuestaForm.controls.preg_13.value,
          "14": selectedPreg14,
          "15": selectedPreg15,
          "16": selectedPreg16,
          "17": selectedPreg17,
          "18": this.encuestaForm.controls.preg_18.value,
          "19": this.encuestaForm.controls.preg_19.value,
          "20": this.encuestaForm.controls.preg_20.value,
          "21": this.encuestaForm.controls.preg_21.value,
          "22": this.encuestaForm.controls.preg_22.value,
          "23": this.encuestaForm.controls.preg_23.value,
          "24": this.encuestaForm.controls.preg_24.value,
          "25": this.encuestaForm.controls.preg_25.value,
          "26": this.encuestaForm.controls.preg_26.value,
          "27": selectedPreg27,
          "28": this.encuestaForm.controls.preg_28.value,
          "29": this.encuestaForm.controls.preg_29.value
        }
      }

      console.log('BODY => ', body)

      //TODO: DESCOMENTAR CUANDO SE TENGA LISTO EL SERVDOR DESPLEGADO
      this.respuestasService.saveRespuestas(body).subscribe((res: any) => {
        if(res.status == 'done') {
          Swal.fire({
            title: 'Encuesta Terminada',
            text: 'Gracias por temrinar nuestra encuesta',
            icon: 'success',
            confirmButtonText: 'Terminar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('');
            }
          })
        } else {
          Swal.fire(
            '',
            'A ocurrido un error',
            'error'
          )
        }
      }, (err) => {
        Swal.fire(
          '',
          'A ocurrido un error',
          'error'
        )
      })

      
    } else {
      Swal.fire(
        '',
        'Faltan preguntas por contestar',
        'error'
      )
    }

    
    // console.log('FORM => ', this.encuestaForm)
  }


  validarFormulario(): boolean {
    let isValid = true;
    if (!this.encuestaForm.valid) {
      this.encuestaForm.markAllAsTouched();
      isValid = false;
    }
    return isValid;
  }

  selectOtro(event: any) {
    if (event.target.form[99].checked) {
      this.encuestaForm.controls.preg_27_OTRO.enable()
      this.showOtroControl = true;
    } else {
      this.encuestaForm.controls.preg_27_OTRO.disable()
      this.showOtroControl = false;
    }
  }

}
