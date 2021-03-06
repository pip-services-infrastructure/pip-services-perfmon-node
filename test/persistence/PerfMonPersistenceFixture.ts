let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { CounterType } from 'pip-services3-components-node';

import { CounterV1 } from '../../src/data/version1/CounterV1';
import { IPerfMonPersistence } from '../../src/persistence/IPerfMonPersistence';

export class PerfMonPersistenceFixture {
    private _persistence: IPerfMonPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public testCreateCounter(done) {
        async.series([
            (callback) => {
                let counter = new CounterV1("test.counter1", CounterType.Statistics);
                counter.count = 1;
                counter.max = 10;
                counter.min = 1;
                counter.average = 5;

                this._persistence.addOne(
                    null, 
                    counter, 
                    (err, counter) => {
                        assert.isNull(err);
                        assert.isObject(counter);
                        callback(err);
                    }
                );
            },
            (callback) => {
                let counter = new CounterV1("test.counter2", CounterType.Increment);
                counter.count = 1;
 
                 this._persistence.addOne(
                    null, 
                    counter, 
                    (err, counter) => {
                        assert.isNull(err);
                        assert.isObject(counter);
                        callback(err);
                    }
                );
            },
            (callback) => {
                let counter = new CounterV1("test1.counter1", CounterType.LastValue);
                counter.last = 123;

                this._persistence.addOne(
                    null, 
                    counter, 
                    (err, counter) => {
                        assert.isNull(err);
                        assert.isObject(counter);
                        callback(err);
                    }
                );
            }
        ], done);
    }

    public testReadWrite(done) {
        let fromTime = new Date();

        async.series([
            (callback) => {
                this.testCreateCounter(callback);
            },
            (callback) => {
                this._persistence.getPageByFilter(
                    null, 
                    FilterParams.fromTuples("name_starts", "test."), 
                    null,
                    (err, page) => {
                        assert.lengthOf(page.data, 2);
                        callback(err);
                    }
                );
            },
            (callback) => {
                this._persistence.getPageByFilter(
                    null, 
                    FilterParams.fromTuples("type", CounterType.Increment), 
                    null,
                    (err, page) => {
                        assert.lengthOf(page.data, 1);
                        callback(err);
                    }
                );
            },
            (callback) => {
                this._persistence.getPageByFilter(
                    null, 
                    FilterParams.fromTuples("search", "counter1"), 
                    null,
                    (err, page) => {
                        assert.lengthOf(page.data, 2);
                        callback(err);
                    }
                );
            }
        ], done);
    }
}
