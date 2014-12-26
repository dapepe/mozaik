var React            = require('react');
var Reflux           = require('reflux');
var _                = require('lodash');
var ApiConsumerMixin = require('./../../../core/mixins/ApiConsumerMixin');

var Instances = React.createClass({
    mixins: [
        Reflux.ListenerMixin,
        ApiConsumerMixin
    ],

    getInitialState: function () {
        return { instances: [] };
    },

    getApiRequest: function () {
        return { id: 'aws.instances' };
    },

    onApiData: function (instances) {
        this.setState({ instances: instances });
    },

    render: function () {
        var instanceNodes = _.map(this.state.instances, function (instance) {
            var cssClass = 'aws__instance aws__instance--' + instance.state;

            return (
                <div key={instance.id} className={cssClass}>
                    {instance.name}
                    {instance.state}
                    <span  className="aws__instance__id">{instance.id}</span>
                </div>
            );
        });

        return <div>
            <div className="widget__header">
                AWS instances
                <span className="widget__header__count">
                    {this.state.instances.length}
                </span>
                <i className="fa fa-hdd-o" />
            </div>
            <div className="widget__body">
                {instanceNodes}
            </div>
        </div>
    }
});

module.exports = Instances;