const mongoose = require('mongoose')
const express = require('express')
const tournament = require('../models/tournament.model')
const {createMatches,saveMatch} = require('../Functions/createMatches.singles')
const cluster = require('cluster')
const evrouter = express.Router()
//---------------------------------
//controller functions
//register
//login
//createTournament
//createMatch 
//MatchResults

evrouter.post('/createTournament',async (req,res)=>{
    //First Matches have to be created
    try{
        await new tournament(req.body).save()
        //update_event_manager_current_tournaments
        res.status(200).send({
            Message:"Successfully Created New Tournament"
        })
    }catch(error){
        console.log(error);
        res.status(404).send({
            Message:"Error in Tournament Creation"
        })
    }
})
evrouter.post('/createMatches',async (req,res)=>{
    //Requirement = tournament id
    //participants array which we will get from the tournaments collection
    const TOURNAMENT_ID = req.body.TOURNAMENT_ID
    try{
        const t = await tournament.findOne({
            TOURNAMENT_ID:TOURNAMENT_ID
        })
        const matches = createMatches(t.PARTICIPANTS)
        for(var i = 0;i<matches.length;i++){
            saveMatch(matches[i].player1,matches[i].player2,t.TOURNAMENT_ID,i)
        }
        res.status(200).send({
            Message:'Created Matches'
        })       
        console.log(process.pid); 
        cluster.worker.kill()
    }catch(err){
        console.log(err);
        res.status(404).send({
            Message:'Tournament not found'
        })
    }
})
module.exports = evrouter