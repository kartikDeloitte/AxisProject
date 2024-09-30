package com.axisproject
import android.os.Build
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.json.JSONObject

class AxisModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "AxisModule"

    @ReactMethod
    fun getDetails(): String {
        return "kartik"
    }
    @ReactMethod
    fun myCallBack(callback:Callback){

        val rootObj = JSONObject()
        rootObj.put("device",Build.DEVICE)
        rootObj.put("manufacturer",Build.MANUFACTURER)
        rootObj.put("model",Build.MODEL)
        rootObj.put("id",Build.ID)
        callback(rootObj.toString())
    }

}