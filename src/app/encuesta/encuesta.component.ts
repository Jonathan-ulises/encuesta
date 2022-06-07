import { Component, OnInit } from '@angular/core';
import { Estado } from '../model/estado.interfaces';
import { EstadosMunicipiosService } from '../services/estados-municipios.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  lstEstados: Estado[] = [];
  lstMunicipios: string[] = [];
  selectedPreg_13Names: string[] = [];

  preg_13Choices: any[] = [
    {
      name: "Via correo electronico",
      value: "Via correo electronico"
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

  encuestaForm = new FormGroup({
    preg_1: new FormControl(null, [Validators.required]),
    preg_2: new FormControl({value: '', disabled: true}, [Validators.required]),
    preg_3: new FormControl(null, [Validators.required]),
    preg_4: new FormControl(null, [Validators.required]),
    preg_5: new FormControl(null, [Validators.required]),
    preg_6: new FormControl(null, [Validators.required]),
    preg_7: new FormControl(null, [Validators.required]),
    preg_8: new FormControl(null, [Validators.required]),
    preg_9: new FormControl(null, [Validators.required]),
    preg_10: new FormControl(null, [Validators.required]),
    preg_11: new FormControl(null, [Validators.required]),
    preg_12: new FormControl(null, [Validators.required]),
    preg_13: new FormArray([]),
    // preg_13: new FormControl(null, [Validators.required]),

    preg_14: new FormControl(null, [Validators.required]),
    preg_15: new FormControl(null, [Validators.required]),
    preg_16: new FormControl(null, [Validators.required]),
    preg_17: new FormControl(null, [Validators.required]),
    preg_18: new FormControl(null, [Validators.required]),
    preg_19: new FormControl(null, [Validators.required]),
    preg_20: new FormControl(null, [Validators.required]),
    preg_21: new FormControl(null, [Validators.required]),
    preg_22: new FormControl(null, [Validators.required]),
    preg_23: new FormControl(null, [Validators.required]),
    preg_24: new FormControl(null, [Validators.required]),
    preg_25: new FormControl(null, [Validators.required]),
    preg_26: new FormControl(null, [Validators.required]),
    preg_27: new FormControl(null, [Validators.required]),
    preg_28: new FormControl(null, [Validators.required]),
    preg_29: new FormControl(null, [Validators.required]),
    preg_30: new FormControl(null)
  })

  constructor(
    private estadoMunicipioService: EstadosMunicipiosService
  ) { }

  ngOnInit(): void {
    this.lstEstados = this.estadoMunicipioService.getEstados();
  }

  cargarMunicipios(event: any): void {
    this.lstMunicipios = this.estadoMunicipioService.getMunicipioByEstado(this.encuestaForm.get('preg_1')!.value!);
    this.encuestaForm.controls['preg_2']?.enable();
  }

  enviarRespuestas(): void {
    console.log('FORM => ', this.encuestaForm)

  }

  onCheckChange(event: any) {
    // const formArray: FormArray = this.encuestaForm.get('preg_13') as FormArray;
  
    // /* Selected */
    // if(event.target.checked){
    //   // Add a new control in the arrayForm
    //   formArray.push(new FormControl(event.target.value));
    // }
    // /* unselected */
    // else{
    //   // find the unselected element
    //   let i: number = 0;
  
    //   formArray.controls.forEach((ctrl: any) => {
    //     if(ctrl.value == event.target.value) {
    //       // Remove the unselected element from the arrayForm
    //       formArray.removeAt(i);
    //       return;
    //     }
  
    //     i++;
    //   });
    // }
  }
}
