//
//  DeviceDataService.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 18.07.24.
//

import Foundation
import UIKit

class DeviceDataService {
    
    func getUUID() -> String {
        return UIDevice.current.identifierForVendor!.uuidString
    }
    
}
