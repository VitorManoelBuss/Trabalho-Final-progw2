import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
//import { INSTANCE_ID_SYMBOL } from "@nestjs/core/injector/instance-wrapper";
import { Tarefa } from "./tarefa.entity";
//import { async } from "rxjs";
//import { runInThisContext } from "vm";
import { TarefaService } from "./tarefa.service"

@Controller()
export class tarefaController {

    // tarefaLista = ['tarefa 01', 'tarefa 02' ];
constructor(
private tarefaService: TarefaService

) {}
    //tarefaLista = [];      //(codigo: '' , descrição)

    //@Get("/tarefa")
    //listaTarefa() {
    // return ['tarefa 01, tarefa 02'];
    @Get("/tarefa")
   async listaTarefa(): Promise<Tarefa[]> {
        //return this.tarefaLista
        return await this.tarefaService.findAll();
    }

    @Put("/tarefa")
  async salvartarefa(@Body() tarefa) {
//let index = this.tarefaLista.findIndex(t => t.codigo == tarefa.codigo);
     //   if (index >= 0) {
        //    this.tarefaLista[index].descricao = tarefa.descricao;
       // } else {
         //   tarefa.codigo = Math.random().toString(36);
        //    this.tarefaLista.push(tarefa);
       // }
        await this.tarefaService.salvar(tarefa);
        return "ok";
    }

    @Get("/tarefa/:codigo")
    async buscarPorCodigo(@Param() parametro) {                       //Param = Significa parametro
        console.log(parametro.codigo);                         // pega o codigo da url
        //let tarefa = this.tarefaLista.find(tarefa => tarefa.codigo == parametro.codigo);
        return await this.tarefaService.findById(parametro.codigo)
        //return tarefa;
    }

    @Delete("/tarefa/:codigo")
   async excluirTarefa(@Param() parametro) {
        //let index = this.tarefaLista.findIndex(tarefa => tarefa.codigo == parameto.codigo);
        //this.tarefaLista.splice(index, 1);
        await this.tarefaService.excluir(parametro.codigo)
        return "ok";
    }
}
