#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path'); 

const lstat = util.promisify(fs.lstat);
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    // either err === error object
    // or err === null meaning everything went OK
if (err){
    // if error is defined then run this if-statement
    console.log(err);
}

const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename));
});

const allStats = await Promise.all(statPromises);

for (let stats of allStats){
    const index = allStats.indexOf(stats);
    if(stats.isFile()){
        console.log(chalk.italic.blue(filenames[index]));   
    } else{
    console.log(chalk.bold.yellow(filenames[index]));}
}
// for (let file of filenames){
//     fs.lstat(file, (err, stats)=>{
//         if (err) {
//             console.log(err);
//         }
//         console.log(file, stats.isFile());
//     });
    // this displays that node.js library methods do not
    // run callback immediately
//}
    //SECOND OPTION
// const allStats = Array(filenames.length).fill(null);
// for (let file of filenames){
//     const index = filenames.indexOf(file);
//     fs.lstat(file, (err, stats) => {
//         if (err){
//             console.log(err);
//         }
//         allStats[index] = stats;
//         const ready = allStats.every((stats) => {
//             return stats;
//         });
//         if (ready) {
//             allStats.forEach((stats, index) => {
//                 console.log(filenames[index], stats.isFile());
//             });
//         }
//     });
//}


});