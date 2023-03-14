import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskCollection: any[] = [];
  constructor(
    private alertController: AlertController,
    private tarefaService: TarefaService
  ) {}

  ionViewDidEnter() {
    this.showTasksInHome();
  }

  showTasksInHome() {
    this.taskCollection = this.tarefaService.showTask();
  }

  async showAdd() {
    const alert = await this.alertController.create({
      header: 'Informe a tarefa',
      inputs: [
        {
          name: 'Tarefa',
          type: 'text',
          placeholder: 'Descreva a tarefa',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Salvar',
          role: 'form',
          handler: (form) => {
            console.log(form);
            this.tarefaService.saveTask(form, () => {
              this.showTasksInHome();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  delete(item: any) {
    this.tarefaService.delete(item, () => {
      this.showTasksInHome();
    });
  }
}
