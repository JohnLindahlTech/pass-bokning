#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {createDebug, log} from './log.mjs';
import {main} from './main.mjs';
import { readSuccess, writeSuccess, readConfig } from './flow/io.mjs';

const args = yargs(hideBin(process.argv))
  .option('watch',{
    alias: 'w',
    type: 'boolean',
    describe: 'Keep the script running until successfully booked a time',
    default: false,
  })
  .option('timeout',{
    alias: 't',
    describe: 'How many seconds to wait between tries.',
    type: 'number',
    default: 60,
  })
  .option('debug',{
    alias: 'd',
    type: 'boolean',
    describe: 'More expressive logging.',
    default: false,
  })
  .option('config',{
    alias: 'c',
    type: 'string',
    describe: 'custom config absolute path.'
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    describe: 'custom success output absolute path.'
  })
  .parse()

if(Number.isNaN(args.timeout)){
  log('--timeout (-t) is not a number');
  process.exit(1);
}

function delay(t, v) {
  return new Promise(function(resolve) { 
      setTimeout(resolve.bind(null, v), t)
  });
}

async function watchMain(options, config, debug){
  let success;

  while(!success){
    debug('New iteration');
    try{
      success = await main(config, debug);
    } catch(error){
      log(error);
    } finally{
      await delay(options.timeout * 1000);
    }
  }
  return success;
}


async function entry(options){
  const debug = createDebug(options.debug);
  log('Starting up')
  try{
    const successFile = await readSuccess(options.output);
    if(successFile?.result?.bookingNumber){
      debug('##############################################');
      log('##### You already have a booking, dummy! #####');
      debug('##############################################');
      return true;
    }
  } catch(e){
    if(e.code !== 'ENOENT'){
      throw e;
    }
    // File does not exist, which is fine, lets continue.
  }

  const config = await readConfig(options.config);

  if(options.watch){
    log(`Running watch mode with ${options.timeout}s timeout between tries.`);
    const result = await watchMain(options, config, debug);
    if(result){
      await writeSuccess({...result, options}, options.output);
    }
  } else {
    log(`Running in single mode.`);
    const result = await main(config, debug);
    if(result){
      await writeSuccess({...result, options}, options.output);
    }
  }
}

entry(args).then(() => {}, console.error);