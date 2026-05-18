describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;

    // Query select all of the <product-item> elements
    const prodItemsData = await page.$$eval('product-item', prodItems => {
      return prodItems.map(item => {
        // Grab all of the json data stored inside
        return data = item.data;
      });
    });

    /**
    **** TODO - STEP 1 ****
    * Loop through every <product-item> we found (not just the first one) and
      make sure each one has its title, price, and image populated.
    */
    for (let i = 0; i < prodItemsData.length; i++) {
      console.log(`Checking product item ${i + 1}/${prodItemsData.length}`);

      // Make sure the title, price, and image are populated in the JSON
      let value = prodItemsData[i];
      if (value.title.length == 0) { allArePopulated = false; }
      if (value.price.length == 0) { allArePopulated = false; }
      if (value.image.length == 0) { allArePopulated = false; }
    }

    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    /**
     **** TODO - STEP 2 ****
     * Query a <product-item> element, grab its shadowRoot, query the button
     * inside it, click it, then check that the button text changed.
     */
    // Query the first <product-item> element (returns a handle)
    const prodItem = await page.$('product-item');
    // Grab the shadowRoot property of that element
    const shadowRoot = await prodItem.getProperty('shadowRoot');
    // Query the button inside the shadowRoot
    const button = await shadowRoot.$('button');
    // Click the button
    await button.click();
    // Grab the innerText property of the button and get its value
    const innerText = await button.getProperty('innerText');
    const text = await innerText.jsonValue();

    // After clicking once, the button should now say "Remove from Cart"
    expect(text).toBe('Remove from Cart');
  }, 10000);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** TODO - STEP 3 ****
     * Query select all of the <product-item> elements, then for every single
       product element get the shadowRoot, query the button inside, and make
       sure it is added to the cart (click it if it still says "Add to Cart").
     * Check to see if the innerText of #cart-count is 20.
     */
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      const shadowRoot = await prodItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      // Only click if it isn't already in the cart so all 20 end up added
      if (text === 'Add to Cart') {
        await button.click();
      }
    }

    // The cart count in the top right should now read 20
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 60000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** TODO - STEP 4 ****
     * Reload the page, then select all of the <product-item> elements, and
       check every element to make sure that all of their buttons say
       "Remove from Cart".
     * Also check to make sure that #cart-count is still 20.
     */
    await page.reload();

    let allRemoveFromCart = true;
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      const shadowRoot = await prodItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      if (text !== 'Remove from Cart') {
        allRemoveFromCart = false;
      }
    }
    expect(allRemoveFromCart).toBe(true);

    // The cart count should still be 20 after the reload
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('20');
  }, 60000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {

    /**
     **** TODO - STEP 5 ****
     * At this point the item 'cart' in localStorage should be
       '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
     */
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    /**
     **** TODO - STEP 6 ****
     * Go through and click "Remove from Cart" on every single <product-item>,
       just like above.
     * Once you have, check to make sure that #cart-count is now 0.
     */
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      const shadowRoot = await prodItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      // Only click items that are currently in the cart
      if (text === 'Remove from Cart') {
        await button.click();
      }
    }

    // The cart count in the top right should now read 0
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 60000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    /**
     **** TODO - STEP 7 ****
     * Reload the page once more, then go through each <product-item> to make
       sure that it has remembered nothing is in the cart - do this by checking
       the text on the buttons so that they should say "Add to Cart".
     * Also check to make sure that #cart-count is still 0.
     */
    await page.reload();

    let allAddToCart = true;
    const prodItems = await page.$$('product-item');
    for (let i = 0; i < prodItems.length; i++) {
      const shadowRoot = await prodItems[i].getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const text = await (await button.getProperty('innerText')).jsonValue();
      if (text !== 'Add to Cart') {
        allAddToCart = false;
      }
    }
    expect(allAddToCart).toBe(true);

    // The cart count should still be 0 after the reload
    const cartCount = await page.$eval('#cart-count', el => el.innerText);
    expect(cartCount).toBe('0');
  }, 60000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    /**
     **** TODO - STEP 8 ****
     * At this point the item 'cart' in localStorage should be '[]', check to make sure it is
     */
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[]');
  });
});
