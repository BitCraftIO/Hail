import BackgroundTask from 'react-native-background-task';
import queueFactory from 'react-native-queue';

export default class TestSync {
    setup() {
        BackgroundTask.define(() => {});
    }

    start() {}

    job() {}
}
