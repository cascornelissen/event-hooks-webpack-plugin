import webpack from 'webpack';
import EventHooksPlugin from '../lib/';

it('Throws a meaningful message when providing an invalid event hook name', () => {
    expect(() => {
        webpack({
            plugins: [
                new EventHooksPlugin({
                    'abc': () => {}
                })
            ]
        });
    }).toThrow(/Invalid hook name/);
});
