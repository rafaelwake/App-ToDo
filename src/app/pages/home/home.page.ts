import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  NavController,
} from '@ionic/angular';
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
    private tarefaService: TarefaService,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController
  ) {}

  ionViewDidEnter() {
    this.showTasksInHome();
  }

  doar() {
    this.navCtrl.navigateForward('doacao');
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

  async openActions(tarefa: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O QUE DESEJA FAZER?',
      buttons: [
        {
          text: tarefa.feito
            ? 'Colocar como pendente'
            : 'Marcar como realizado',
          icon: tarefa.feito ? 'close-outline' : 'checkmark-circle',
          handler: () => {
            tarefa.feito = !tarefa.feito;

            this.tarefaService.atualizar(tarefa, () => {
              this.showTasksInHome();
            });
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
