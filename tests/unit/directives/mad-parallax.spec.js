import * as Mad from '@/directives/mad-parallax';

describe('Mad Parallax plugin', () => {
  let windowSpy;
  let elem;
  let elemParent;
  let parallaxScrollHandlerMock;
  let setCustomPropertiesMock;
  const options = {
    speed: 0.1,
    direction: 'y',
    mobileSize: 976,
    maxMove: 0,
    reverse: false,
    customMove: false,
    startPoint: 1.5,
    disabled: false,
    prlx3d: false,
  };

  beforeEach(() => {
    elem = document.createElement('div');
    elemParent = document.createElement('div');
    elem.textContent = 'test';
    elemParent.append(elem);
    windowSpy = jest.spyOn(global, 'window', 'get');
    parallaxScrollHandlerMock = jest.spyOn(Mad, 'parallaxScrollHandler');
    setCustomPropertiesMock = jest.spyOn(Mad, 'setCustomProperties');
    jest.spyOn(Math, 'abs');
    jest.spyOn(Math, 'sign');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('checkIsMobileSize function must be called once on desktop', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 1000,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    const checkIsMobileSizeMock = jest.spyOn(Mad, 'checkIsMobileSize');
    Mad.checkIsMobileSize(elem, options);
    expect(checkIsMobileSizeMock).toHaveBeenCalledTimes(1);
    expect(elem.getAttribute('style')).toBeNull();
  });

  it('checkIsMobileSize function must be called once on mobile', () => {
    windowSpy.mockImplementation(() => ({
      innerWidth: 970,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    const checkIsMobileSizeMock = jest.spyOn(Mad, 'checkIsMobileSize');
    Mad.checkIsMobileSize(elem, options);
    expect(checkIsMobileSizeMock).toHaveBeenCalledTimes(1);
    expect(elem.style.transform).toEqual('translateY(0px)');
  });

  it('parallaxScrollHandler function must be called once', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 1000,
    }));
    Mad.parallaxScrollHandler(elem, options);
    expect(parallaxScrollHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('parallaxScrollHandler function must be called once with negative elemIntoView', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: -100,
    }));
    Mad.parallaxScrollHandler(elem, options);
    expect(parallaxScrollHandlerMock).toHaveBeenCalledTimes(1);
    expect(elem.style.transform).toEqual('translateY(0px)');
  });

  describe('Parallax two columns', () => {
    beforeEach(() => {
      jest.spyOn(elem, 'getBoundingClientRect').mockImplementation(() => ({
        bottom: 20,
        top: 10,
        height: 30,
      }));
      jest.spyOn(elem.parentElement, 'getBoundingClientRect').mockImplementation(() => ({ height: 40 }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('parallaxScrollHandler function must be called once with after elem scroll', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 100,
        scrollY: 150,
      }));

      Mad.parallaxScrollHandler(elem, options);
      expect(parallaxScrollHandlerMock).toHaveBeenCalledTimes(1);
      expect(elem.style.transform).toEqual('translateY(10px)');
    });

    it('parallaxScrollHandler function must be called once equal pxToMove', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 35,
        scrollY: 0,
      }));

      Mad.parallaxScrollHandler(elem, options);
      expect(parallaxScrollHandlerMock).toHaveBeenCalledTimes(1);
      expect(elem.style.transform).toEqual('translateY(5px)');
    });
  });

  it('parallaxScrollHandler else path to call custom move', () => {
    options.customMove = true;
    Mad.parallaxScrollHandler(elem, options);
    expect(parallaxScrollHandlerMock).toHaveBeenCalledTimes(1);
  });

  it('setCustomProperties with prlx3d true', () => {
    windowSpy.mockImplementation(() => ({
      innerHeight: 0,
      scrollY: 10,
    }));

    jest.spyOn(elem, 'getBoundingClientRect').mockImplementation(() => ({ bottom: 20, top: 0 }));

    options.prlx3d = true;
    options.maxMove = 30;
    Mad.setCustomProperties(elem, options, 10, 5);
    expect(setCustomPropertiesMock).toHaveBeenCalledTimes(1);
    expect(elem.style.transform).toEqual('translate3d(0, 10px, 0)');
  });

  describe('Parallax custom move with move pixels', () => {
    beforeEach(() => {
      jest.spyOn(elem, 'getBoundingClientRect').mockImplementation(() => ({
        bottom: 20,
        top: 0,
        height: 30,
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('setCustomProperties with maxMove options', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 0,
      }));

      options.prlx3d = false;
      options.maxMove = 30;
      Mad.setCustomProperties(elem, options, 30, 5);
      expect(setCustomPropertiesMock).toHaveBeenCalledTimes(1);
    });

    it('setCustomProperties with maxMove options elem height', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 0,
      }));

      options.prlx3d = false;
      options.maxMove = 0;
      Mad.setCustomProperties(elem, options, -30, 5);
      expect(setCustomPropertiesMock).toHaveBeenCalledTimes(1);
    });

    it('setCustomProperties when the element went up the viewport', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 0,
        scrollY: 100,
      }));

      options.prlx3d = false;
      options.maxMove = 0;
      Mad.setCustomProperties(elem, options, 30, 5);
      expect(setCustomPropertiesMock).toHaveBeenCalledTimes(1);
    });

    it('setCustomProperties if options.reverse to be true', () => {
      windowSpy.mockImplementation(() => ({
        innerHeight: 0,
        scrollY: 100,
      }));

      options.prlx3d = false;
      options.maxMove = 0;
      options.reverse = true;
      Mad.setCustomProperties(elem, options, 30, 5);
      expect(setCustomPropertiesMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should call onScroll handler', () => {
    jest.spyOn(Mad, 'parallaxScrollHandler').mockImplementation(() => jest.fn());
    const onScrollMock = jest.spyOn(Mad, 'onScroll');
    Mad.onScroll(null, [{ el: elem, options }, { el: elem, options }]);
    expect(onScrollMock).toHaveBeenCalledTimes(1);
  });

  it('should call onScroll handler without elems array', () => {
    jest.spyOn(Mad, 'parallaxScrollHandler').mockImplementation(() => jest.fn());
    const onScrollMock = jest.spyOn(Mad, 'onScroll');
    Mad.onScroll(null);
    expect(onScrollMock).toHaveBeenCalledTimes(1);
  });
});
