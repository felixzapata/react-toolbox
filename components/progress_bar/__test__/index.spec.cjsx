TestUtils   = React.addons.TestUtils
expect      = require('expect')
utils       = require('../../test_utils')
ProgressBar = require('../index')

describe 'ProgressBar', ->
  describe '#calculateRatio', ->
    before ->
      @progressBar = utils.renderComponent(ProgressBar, { min: 100, max: 300 })

    it 'calculates the right ratio', ->
      expect(@progressBar.calculateRatio(150)).toEqual(0.25)

    it 'gets 0 when value is less than min', ->
      expect(@progressBar.calculateRatio(10)).toEqual(0)

    it 'gets 1 when value is more than max', ->
      expect(@progressBar.calculateRatio(400)).toEqual(1)

  describe '#render', ->
    it 'renders the value and buffer bars when it is linear', ->
      progressBarWrapper = utils.shallowRenderComponent(ProgressBar).props.children
      expect(progressBarWrapper.props.children.length).toEqual(2)
      expect(progressBarWrapper.props.children[0].ref).toEqual('buffer')
      expect(progressBarWrapper.props.children[1].ref).toEqual('value')

    it 'renders the proper scaleX for buffer and value when its linear and determinate', ->
      progressBar = utils.shallowRenderComponent(ProgressBar, {mode: 'determinate', value: 30, buffer: 60})
      buffer = (progressBar.props.children.props.children[0])
      value = (progressBar.props.children.props.children[1])
      expect(buffer.props.style.transform).toEqual("scaleX(#{0.6})")
      expect(value.props.style.transform).toEqual("scaleX(#{0.3})")

    it 'renders the svg circle when it is circular', ->
      progressBar = utils.shallowRenderComponent(ProgressBar, {type: 'circular'})
      expect(progressBar.props.children.type).toEqual('svg')
      expect(progressBar.props.children.props.children.type).toEqual('circle')

    it 'renders the proper circle length style when it is circular and determinate', ->
      progressBar  = utils.shallowRenderComponent(ProgressBar, {type: 'circular', mode: 'determinate', value: 30})
      circle       = progressBar.props.children.props.children
      strokeLength = 2 * Math.PI * circle.props.r * 0.3
      expect(circle.props.style.strokeDasharray).toEqual("#{strokeLength}, 400")

    it 'contains mode and className in its className', ->
      progressBar = utils.shallowRenderComponent(ProgressBar, {mode: 'determinate', className: 'tight'})
      expect(progressBar.props.className).toContain('determinate')
      expect(progressBar.props.className).toContain('tight')