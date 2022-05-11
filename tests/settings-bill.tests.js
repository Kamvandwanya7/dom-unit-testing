describe('The bill with settings factory function', function () {
  it('It should be able to set the call cost', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(10);  
    settingsBill.setCallCost(1.85);
    assert.equal(1.85, settingsBill.getCallCost());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setCallCost(2.75);
    assert.equal(2.75, settingsBill2.getCallCost());
  });

  it('It should be able to set the sms cost', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setSmsCost(0.85);
    assert.equal(0.85, settingsBill.getSmsCost());

    let settingsBill2 = BillWithSettings();
    settingsBill2.setSmsCost(0.75);
    assert.equal(0.75, settingsBill2.getSmsCost());
  });

  it('It should be able to set the sms and call cost', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setSmsCost(0.85);
    assert.equal(0.85, settingsBill.getSmsCost());

    settingsBill.setCallCost(2.75)
    settingsBill.setSmsCost(0.85)
    assert.equal(0.85, settingsBill.getSmsCost())
    assert.equal(2.75, settingsBill.getCallCost())

    let settingsBill2 = BillWithSettings();
    settingsBill2.setCallCost(1.75)
    settingsBill2.setSmsCost(0.65)
    assert.equal(0.65, settingsBill2.getSmsCost())
    assert.equal(1.75, settingsBill2.getCallCost())
  });

  it('It should be able to set the warning level', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setWarningLevel(20);
    assert.equal(20, settingsBill.getWarningLevel())
  });

  it('It should be able to set the critical level', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(30);
    assert.equal(30, settingsBill.getCriticalLevel())
  });

  it('It should be able to set the warning and critical level', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(20);
    settingsBill.setWarningLevel(30)
    assert.equal(20, settingsBill.getCriticalLevel())
    assert.equal(30, settingsBill.getWarningLevel())

  });
});


describe('Use values', function () {
  it('it should be able to use call cost set', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(10)
    settingsBill.setCallCost(2.25);
    settingsBill.setSmsCost(0.85);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    assert.equal(6.75, settingsBill.getTotalCost())
    assert.equal(6.75, settingsBill.getTotalCallCost())
    assert.equal(0.00, settingsBill.getTotalSmsCost())
  });

  it('it should be able to use call cost set for 2 calls at 1.35 each', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(10);
    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);

    settingsBill.makeCall();
    settingsBill.makeCall();
    assert.equal(2.70, settingsBill.getTotalCost())
    assert.equal(2.70, settingsBill.getTotalCallCost())
    assert.equal(0.00, settingsBill.getTotalSmsCost())
  });

  it('it should be able to send 2 sms at 0.85 each', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(10);
    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);

    settingsBill.sendSms();
    settingsBill.sendSms();
    assert.equal(1.70, settingsBill.getTotalCost())
    assert.equal(0.00, settingsBill.getTotalCallCost())
    assert.equal(1.70, settingsBill.getTotalSmsCost())
  });

  it('it should be able to send 2 sms at 0.85 each and make 1 call at 1.35', function () {
    let settingsBill = BillWithSettings();
    settingsBill.setCriticalLevel(10);
    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);

    settingsBill.sendSms();
    settingsBill.makeCall()
    settingsBill.sendSms();
    assert.equal(3.05, settingsBill.getTotalCost())
    assert.equal(1.35, settingsBill.getTotalCallCost())
    assert.equal(1.70, settingsBill.getTotalSmsCost())
  });
});

describe('warning and critical level', function () {
  it('it should return a class name of "warning" if warning level is reached', function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(1.35);
    settingsBill.setSmsCost(0.85);
    settingsBill.setWarningLevel(5);
    settingsBill.setCriticalLevel(10)

    settingsBill.sendSms();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("warning", settingsBill.totalClassName())
  });

  it('it should return a class name of "critical" if critical level is reached', function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.50);
    settingsBill.setSmsCost(0.85);
    settingsBill.setWarningLevel(5);
    settingsBill.setCriticalLevel(10);

    settingsBill.sendSms();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("critical", settingsBill.totalClassName())
  });


  it('it should stop the total call cost from increasing when the critical level is reached', function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.50);
    settingsBill.setSmsCost(0.85);
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("critical", settingsBill.totalClassName())
    assert.equal(10, settingsBill.getTotalCallCost())
  });

  it('it should allow total to increase after reaching the critical level and upping the cirtical level', function () {
    let settingsBill = BillWithSettings();

    settingsBill.setCallCost(2.50);
    settingsBill.setSmsCost(0.85);
    settingsBill.setWarningLevel(8)
    settingsBill.setCriticalLevel(10);

    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();
    settingsBill.makeCall();

    assert.equal("critical", settingsBill.totalClassName())
    assert.equal(10, settingsBill.getTotalCallCost())

    settingsBill.setCriticalLevel(20);
    assert.equal("warning", settingsBill.totalClassName())
    settingsBill.makeCall();
    settingsBill.makeCall();
    assert.equal(15, settingsBill.getTotalCallCost())


  }); 
});